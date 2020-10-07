using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        
        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id AS PostId, p.Title, p.Content, p.ImageLocation AS PostImageLocation,
                               p.CreateDateTime AS PostCreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
	                           c.[Name],
	                           up.DisplayName, up.FirstName, up.LastName, up.ImageLocation AS UserImageLocation, up.Email
                          FROM Post p
                     LEFT JOIN Category c ON c.Id = p.CategoryId
                     LEFT JOIN UserProfile up ON up.Id = p.UserProfileId;";

                    var reader = cmd.ExecuteReader();  
                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        var post = NewPostFromDb(reader);

                        posts.Add(post);
                    }

                    reader.Close();
                    return posts;

                }
            }
        }

        private Post NewPostFromDb(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "PostId"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                IsApproved = DbUtils.GetBool(reader, "IsApproved"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                    ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId")
                }
            };
        }
    }
}
