using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }

        // Method to get list of tags associated with a post
        public List<PostTag> GetTagsByPostId(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
	                                        pt.Id,
	                                        pt.PostId,
	                                        pt.TagId,
	                                        t.Name AS TagName
                                        FROM
	                                        PostTag pt
	                                        LEFT JOIN Tag t ON pt.TagId = t.Id
                                        WHERE
	                                        pt.PostId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", postId);

                    var reader = cmd.ExecuteReader();

                    List<PostTag> postTags = new List<PostTag>();

                    while (reader.Read())
                    {
                        postTags.Add(new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            TagId = DbUtils.GetInt(reader, "TagId"),
                            Tag = new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            }
                        });
                    }

                    reader.Close();

                    return postTags;
                }
            }
        }

        // Method to add PostTag relationship
        public void AddPostTag(PostTag postTag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId)
                                        OUTPUT INSERTED.id
                                        VALUES (@PostId, @TagId)";

                    DbUtils.AddParameter(cmd, "@PostId", postTag.PostId);
                    DbUtils.AddParameter(cmd, "@TagId", postTag.TagId);

                    postTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Method deletes PostTag record by tag id and post id, when user no longer wants a tag associated with a post
        public void RemoveTagFromPost(int tagId, int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM
	                                        PostTag
                                        WHERE
	                                        TagId = @TagId AND PostId = @PostId;";

                    DbUtils.AddParameter(cmd, "@TagId", tagId);
                    DbUtils.AddParameter(cmd, "@PostId", postId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
