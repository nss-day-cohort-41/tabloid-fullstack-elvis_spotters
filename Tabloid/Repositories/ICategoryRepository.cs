using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
    {
    public interface ICategoryRepository
        {
        void AddCategory(Category category);
        List<Category> GetCategories();
        Category GetCategoryById(int id);
        void EditCategory(int id, Category category);
        void DeleteCategory(int id);
        }
    }