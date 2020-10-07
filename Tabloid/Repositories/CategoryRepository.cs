using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
    {
    public class CategoryRepository : BaseRepository, ICategoryRepository
        {

        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public void AddCategory(Category category)
            {
            using (SqlConnection conn = Connection)
                {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"
                                        INSERT INTO
                                        Category (Name) 
                                        VALUES(@name)";
                    cmd.Parameters.AddWithValue("@name", category.Name);
                    category.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }
        public List<Category> GetCategories()
            {
            List<Category> categories = new List<Category>();
            using (SqlConnection conn = Connection)
                {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"";
                    }
                }


            return categories;
            }

        }
    }
