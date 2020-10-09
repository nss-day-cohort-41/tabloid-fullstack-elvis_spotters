using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        List<Post> GetAllPublishedPosts();
        Post GetPostById(int id);
        List<Post> GetPostsByUserId(int userId);
        List<Category> GetCategories();
        void Add(Post post);
        void Update(Post post);
        void Delete(int id);
    }
}