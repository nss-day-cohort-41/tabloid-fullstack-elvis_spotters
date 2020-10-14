using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentsByPostId(int postId);
        Comment GetById(int commentId);
        void Add(Comment comment);
        void Edit(Comment comment);
        void Delete(int commentId);
    }
}