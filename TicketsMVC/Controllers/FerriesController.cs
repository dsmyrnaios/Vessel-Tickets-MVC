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

            Passengers passenger = new Passengers();
            passenger.NumOfPassengers = 1;
            passenger.NumOfAdults = 1;
            mod.TotPassengers = passenger;

            Vehicles vehicles = new Vehicles();
            mod.TotVehicles = vehicles;

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

            ResultsModel resmodel = new ResultsModel();

            resmodel.MultDepList = new List<MultipleDeparture>();
            foreach (MultipleDeparture multdep in model.MultDepList)
            {
                resmodel.MultDepList.Add(multdep);
            }

            resmodel.TotPassengers = model.TotPassengers;
            resmodel.TotVehicles = model.TotVehicles;
            resmodel.Triptype = model.Triptype;

            return View(resmodel);
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