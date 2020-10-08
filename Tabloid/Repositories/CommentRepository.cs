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

        public List<Comment> GetCommentsByPost(int postId)
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
                    FirebaseUserId = DbUtils.GetString(reader, "FirbaseUserId")
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
