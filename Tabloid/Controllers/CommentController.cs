using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IUserProfileRepository _userProfileRepo;

        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepo = commentRepository;
            _userProfileRepo = userProfileRepository;
        }



        // GET: by post Id
        [HttpGet("{postId}")]
        public IActionResult Get(int postId)
        {
            var comments = _commentRepo.GetCommentsByPostId(postId);
            if (comments == null)
            { return NotFound(); };

            return Ok(comments);
        }

        //// GET: individual comment by postId and commentId
        [HttpGet("{postId}/{commentId}")]
        public IActionResult Get(int postId, int commentId)
        {
            var comment = _commentRepo.GetById(commentId);
            if (comment == null)
            { 
                return NotFound(); 
            };

            return Ok(comment);
        }

        // POST api/<CommentController>
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;
            _commentRepo.Add(comment);
            return CreatedAtAction("Get", new { postId = comment.PostId }, comment);
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepo.Edit(comment);

            return NoContent();
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepo.Delete(id);
            return NoContent();
        }


    }
}
