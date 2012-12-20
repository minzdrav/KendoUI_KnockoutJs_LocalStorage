using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestKnockoutjs.Models;

namespace TestKnockoutjs.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetData(int? lastId)
        {
            var result = new List<ItemModel>();
            if (lastId == null)
            {
                result.Add(new ItemModel { Id = 1, Name = "First"});
            }
            else
            {
                var id = (int)lastId + 1;
                result.Add(new ItemModel { Id = id, Name = "Element_" + id });
            }
            return Json(result);
        }

    }
}
