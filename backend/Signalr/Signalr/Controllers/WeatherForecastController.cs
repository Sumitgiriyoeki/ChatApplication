using Microsoft.AspNetCore.Mvc;
using Signalr.model;

namespace Signalr.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static List<User> users = new List<User>
        {
            new User {Id = 1, Name = "abc"}
        };

        [HttpPost("getall")]
        public IActionResult GetAll()
        {
            return Ok(users);
        }

        [HttpPost("create")]
        public IActionResult Create(User user)
        {
            users.Add(user);
            return Ok(user);
        }

        [HttpPost("update")]
        public IActionResult Update(int id, User updateuser)
        {
            var user = users.FirstOrDefault(x => x.Id == id);
            user.Name = updateuser.Name;
            return Ok(user);
        }

        [HttpPost("delete")]
        public IActionResult Delete(int id)
        {
            var user = users.FirstOrDefault(x => x.Id == id);
            users.Remove(user);
            return Ok(user);
        }
    }
}
