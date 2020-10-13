using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();

        public Tag GetById(int id);

        public void Add(Tag tag);

        public void Delete(int id);

        public void Update(Tag tag);
    }
}