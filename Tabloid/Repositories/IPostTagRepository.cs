using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        List<PostTag> GetTagsByPostId(int postId);

        public void AddPostTag(PostTag postTag);
    }
}