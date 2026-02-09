using Microsoft.AspNetCore.Mvc;
using PersonApi.Models;

namespace PersonApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Person>> GetAll()
    {
        return Ok(Person.Persons);
    }
}
