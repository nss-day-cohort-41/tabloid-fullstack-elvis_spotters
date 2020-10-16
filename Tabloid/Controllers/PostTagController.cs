using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;

        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var postTags = _postTagRepository.GetTagsByPostId(id);

            return Ok(postTags);
        }

        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            // Getting all current tags associated with post
            var currentTags = _postTagRepository.GetTagsByPostId(postTag.PostId);

            // Making sure duplicate Tags aren't added
            foreach (PostTag tag in currentTags)
            {
                if (postTag.TagId == tag.TagId)
                {
                    return NoContent();
                }
            }

            _postTagRepository.AddPostTag(postTag);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepository.DeletePostTag(id);

            return NoContent();
        }
    }
}
