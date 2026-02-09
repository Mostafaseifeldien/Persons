using Microsoft.AspNetCore.Mvc;
using PersonApi.Models;

namespace PersonApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    [HttpGet("{id}")]
    public ActionResult<Person> Get(int id)
    {
        var person = Person.Persons.FirstOrDefault(p => p.Id == id);
        if (person == null)
        {
            return NotFound();
        }
        return Ok(person);
    }
}
