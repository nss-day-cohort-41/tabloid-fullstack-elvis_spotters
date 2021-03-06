﻿using Microsoft.Data.SqlClient;
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
            using(SqlConnection conn = Connection)
                {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"
                                         UPDATE Category
                                         SET Name = @name
                                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@name", category.Name);
                    cmd.Parameters.AddWithValue("@id", category.Id);
                    try
                        {
                        cmd.ExecuteNonQuery();
                        conn.Close();
                        return;
                        }
                    catch(Exception ex)
                        {
                        Console.WriteLine(ex.Message);
                        conn.Close();
                        return;
                        }
                    }
                }
            }
        public void DeleteCategory(int id)
            {
            //Returning on Default, this ID should not be deleted.
            if (id == 10) return;
            using(SqlConnection conn = Connection)
                {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"
                                       UPDATE Post 
                                       SET Post.CategoryId = 10
                                       WHERE Post.CategoryId = @id
                                        
                                       DELETE Category
                                       WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    try
                        {
                    cmd.ExecuteNonQuery();
                        conn.Close();
                        return;
                        }
                    catch(Exception ex)
                        {
                        Console.WriteLine(ex.Message);
                        conn.Close();
                        return;
                        }
                    
                    }
                }

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
