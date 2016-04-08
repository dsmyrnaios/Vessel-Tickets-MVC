using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TicketsMVC.Models;

namespace TicketsMVC.Controllers
{
    public class FerriesController : Controller
    {
        [AllowAnonymous]
        public ActionResult Search()
        {
            var mod = new SearchViewModel();
            mod.NumOfPassengers = 1;
            mod.NumOfAdults = 1;

            return View(mod);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Results(SearchViewModel model)
        {
            ViewBag.Message = "Your application description page.";
            if (ModelState.IsValid)
            {
                ViewBag.Message = "correct";
            }

            return View(model);
        }

        public ActionResult Passengers()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Payment()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Confirmation()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        

    }
}