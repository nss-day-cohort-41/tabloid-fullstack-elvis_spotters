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
                                        OUTPUT INSERTED.Id
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
                    cmd.CommandText = @"
                                        SELECT 
                                        c.Id as CategoryId,
                                        c.Name as CategoryName 
                                        FROM Category c
                                        ORDER BY Name";
                    SqlDataReader reader = cmd.ExecuteReader();
                        while(reader.Read())
                        {
                        categories.Add(NewCategory(reader));
                        }
                    reader.Close();
                    
                    }
                    conn.Close();
                    return categories;
                }
            }
        public Category GetCategoryById(int id)
            {
            using(SqlConnection conn = Connection)
                {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"
                        SELECT 
                        c.Id as CategoryId, 
                        c.Name as CategoryName
                        FROM Category c
                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read()) return NewCategory(reader);
                    conn.Close();
                    return null;
                    }
                }
            }
        public void EditCategory(int id, Category category)
            {

            }
        public void DeleteCategory(int id)
            {

            }
        public Category NewCategory(SqlDataReader reader)
            {
            return new Category()
                {
                Id = DbUtils.GetInt(reader, "CategoryId"),
                Name = DbUtils.GetString(reader, "CategoryName")
                };
            }
        
        }
    }
