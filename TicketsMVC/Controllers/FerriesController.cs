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
            SearchModel mod = new SearchModel();

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
        public ActionResult Results(SearchModel model)
        {
            if (ModelState.IsValid)
            {
                ViewBag.Message = "correct";
            }

            ResultsModel resmodel = new ResultsModel();

            resmodel.MultDepList = new List<MultipleDeparture>();
            var count = 0;
            foreach (MultipleDeparture multdep in model.MultDepList)
            {
                count++;
                resmodel.MultDepList.Add(multdep);
                Routeselection RouteList = new Routeselection();
                resmodel.MultRouteList.Add(RouteList);
            }
            if(count==1)
            {
                Routeselection RouteList = new Routeselection();
                resmodel.MultRouteList.Add(RouteList);
            }

            resmodel.TotPassengers = model.TotPassengers;
            resmodel.TotVehicles = model.TotVehicles;
            resmodel.Triptype = model.Triptype;

            TempData["MultDepList"] = resmodel.MultDepList;
            TempData["TotPassengers"] = resmodel.TotPassengers;
            TempData["TotVehicles"] = resmodel.TotVehicles;
            TempData["Triptype"] = resmodel.Triptype;

            return View(resmodel);
        }

        [HttpGet]
        [AllowAnonymous] 
        public ActionResult Passengers(ResultsModel model)
        {
            PassengersModel passmodel = new PassengersModel();

            passmodel.MultDepList = new List<MultipleDeparture>();
            foreach (MultipleDeparture multdep in (List<MultipleDeparture>)TempData.Peek("MultDepList"))
            {
                passmodel.MultDepList.Add(multdep);
            }

            passmodel.MultRouteList = new List<Routeselection>();
            foreach (Routeselection multroute in model.MultRouteList)
            {
                passmodel.MultRouteList.Add(multroute);
            }

            passmodel.TotPassengers = (Passengers)TempData.Peek("TotPassengers");
            passmodel.TotVehicles = (Vehicles)TempData.Peek("TotVehicles");
            passmodel.Triptype = (Triptype)TempData.Peek("Triptype");

            return View(passmodel);
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