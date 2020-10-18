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

        [HttpPost("{id}")]
        // Post method takes in postId from route parameter and list of selected tag ids from client side
        public IActionResult Post(int id, List<int> selectedTagIds)
        {
            // Getting all PostTags associated to post
            var previouslySelectedTags = _postTagRepository.GetTagsByPostId(id);
            var previouslySelectedTagIds = new List<int>();

            // Extracting tag ids from previously selected PostTags
            foreach (PostTag postTag in previouslySelectedTags)
            {
                previouslySelectedTagIds.Add(postTag.TagId);
            }

            // Execute when list of selected tag ids from client side is NOT empty
            if (selectedTagIds != null)
            {
                // Iterating through new list of tag ids from client side
                foreach (int tagId in selectedTagIds)
                {
                    // Add new PostTag when new tag id is not found in list of previously selected tag ids, eliminates duplicates
                    if (!previouslySelectedTagIds.Contains(tagId))
                    {
                        _postTagRepository.AddPostTag(new PostTag(){
                                PostId = id,
                                TagId = tagId
                            });
                    }
                }
                // Iterating through list of previously selected tag ids associated with post
                foreach (int tagId in previouslySelectedTagIds)
                {
                    // Removing PostTag when previous tag id is not found in new list of tag ids from client side
                    if (!selectedTagIds.Contains(tagId))
                    {
                        _postTagRepository.RemoveTagFromPost(tagId, id);
                    }
                }
            }
            // Executing when new list of tag ids from client side is empty
            else
            {
                // Iterating through list of previously selected tag ids associated with post, meaning user wants to remove all associated tags in client side
                foreach(int tagId in previouslySelectedTagIds)
                {
                    _postTagRepository.RemoveTagFromPost(tagId, id);
                }
            }

            return NoContent();
        }
    }
}
