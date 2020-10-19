using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        //returns list of comments
        public List<Comment> GetCommentsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    string getCommentsSql = @"
                            SELECT
                                c.Id, 
                                c.PostId, 
                                c.Subject, 
                                c.Content, 
                                c.CreateDateTime AS CommentCreateDateTime, 
                                c.UserProfileId AS CommentUserProfileId,
                                p.Title, 
                                p.Content AS PostContent, 
                                p.ImageLocation AS PostImageLocation, 
                                p.CreateDateTime AS PostCreateDateTime, 
                                p.PublishDateTime, 
                                p.IsApproved, 
                                p.CategoryId, 
                                p.UserProfileId AS PostUserProfileId,
                                up.FirstName,
                                up.LastName,
                                up.DisplayName,
                                up.Email,
                                up.CreateDateTime AS ProfileCreateDateTime,
                                up.ImageLocation AS ProfileImageLocation,
                                up.UserTypeId,
                                up.FirebaseUserId 
                            FROM Comment c 
                                LEFT JOIN Post p ON c.PostId = p.Id
                                LEFT JOIN UserProfile up ON c.UserProfileId = up.Id
                            WHERE c.PostId = @postId
                            ORDER BY CommentCreateDateTime DESC
                        ";

                    cmd.CommandText = getCommentsSql;

                    cmd.Parameters.AddWithValue("@postId", postId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(GetCommentFromReader(reader));
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        //returns a single comment
        public Comment GetById(int commentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    string getCommentSql = @"
                            SELECT
                                c.Id, 
                                c.PostId, 
                                c.Subject, 
                                c.Content, 
                                c.CreateDateTime AS CommentCreateDateTime, 
                                c.UserProfileId AS CommentUserProfileId,
                                p.Title, 
                                p.Content AS PostContent, 
                                p.ImageLocation AS PostImageLocation, 
                                p.CreateDateTime AS PostCreateDateTime, 
                                p.PublishDateTime, 
                                p.IsApproved, 
                                p.CategoryId, 
                                p.UserProfileId AS PostUserProfileId,
                                up.FirstName,
                                up.LastName,
                                up.DisplayName,
                                up.Email,
                                up.CreateDateTime AS ProfileCreateDateTime,
                                up.ImageLocation AS ProfileImageLocation,
                                up.UserTypeId,
                                up.FirebaseUserId 
                            FROM Comment c 
                                LEFT JOIN Post p ON c.PostId = p.Id
                                LEFT JOIN UserProfile up ON c.UserProfileId = up.Id
                            WHERE c.Id = @commentId
                        ";

                    cmd.CommandText = getCommentSql;

                    cmd.Parameters.AddWithValue("@commentId", commentId);

                    var reader = cmd.ExecuteReader();

                    Comment comment = null;

                    if (reader.Read())
                    {
                        comment = GetCommentFromReader(reader);
                    }

                    reader.Close();

                    return comment;
                }
            }
        }

        //add comment to database
        public void Add (Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment
                        (PostId, UserProfileId, Subject, Content, CreateDateTime)
                        OUTPUT Inserted.Id
                        VALUES
                        (@postId, @userProfileId, @subject, @content, @createDateTime)                 
                    ";

                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@createDateTime", comment.CreateDateTime);

                 
                    comment.Id = (int)cmd.ExecuteScalar();




                }
            }
        }

        private void NotFound()
        {
            throw new NotImplementedException();
        }

        //edit comment
        public void Edit (Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       UPDATE Comment
                       SET
                        PostId = @postId,
                        UserProfileId = @userProfileId,
                        Subject = @subject,
                        Content = @content,
                        CreateDateTime = @createDateTime
                       WHERE
                        Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@createDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@Id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //deletes comment by Id
        public void Delete(int commentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Comment
                        WHERE Id = @commentId
                    ";

                    cmd.Parameters.AddWithValue("@commentId", commentId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        private Comment GetCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                PostId = DbUtils.GetInt(reader, "PostId"),
                Subject = DbUtils.GetString(reader, "Subject"),
                Content = DbUtils.GetString(reader, "Content"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CommentCreateDateTime"),
                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "CommentUserProfileId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "ProfileCreateDateTime"),
                    ImageLocation = DbUtils.GetString(reader, "ProfileImageLocation"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId")
                },
                Post = new Post()
                {
                    Id = DbUtils.GetInt(reader, "PostId"),
                    Title = DbUtils.GetString(reader, "Title"),
                    Content = DbUtils.GetString(reader, "PostContent"),
                    ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime"),
                    PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                    IsApproved = DbUtils.GetBool(reader, "IsApproved"),
                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                    UserProfileId = DbUtils.GetInt(reader, "PostUserProfileId")
                }

            };
        }
    }
}
