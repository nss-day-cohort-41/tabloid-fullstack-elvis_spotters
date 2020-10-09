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
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : ControllerBase
        {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
            {
            _categoryRepository = categoryRepository;
            }

        [HttpPost("create")]
        public IActionResult Post(Category category )
            {
            try
                {
                _categoryRepository.AddCategory(category);
                return Ok();
                }
            catch(Exception ex)
                {
                return NotFound();
                }
            }
        [HttpGet]
        public IActionResult GetAll()
            {
            try
                {
                List<Category> categories = _categoryRepository.GetCategories();
                return Ok(categories);
                }
            catch(Exception ex)
                {
                return NotFound();
                }
            }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
            {
            try
                {
            Category category = _categoryRepository.GetCategoryById(id);
            return Ok(category);
                }
            catch(Exception ex)
                {
                Console.WriteLine(ex.Message);
                return NotFound();
                }
            
            }

        [HttpPut("{id}")]
        public IActionResult EditCategory(int id, Category category)
            {
            try
                {
                _categoryRepository.EditCategory(id, category);
                return Ok();
                }
            catch(Exception ex)
                {
                Console.WriteLine(ex.Message);
                return NotFound();
                }
            }
        }
    }
