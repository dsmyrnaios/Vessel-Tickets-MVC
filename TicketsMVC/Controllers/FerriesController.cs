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
            SearchModel sermodel = new SearchModel();

            Passengers passenger = new Passengers();
            passenger.NumOfPassengers = 1;
            passenger.NumOfAdults = 1;
            sermodel.TotPassengers = passenger;

            Vehicles vehicles = new Vehicles();
            sermodel.TotVehicles = vehicles;

            TempData["TotPassengers"] = sermodel.TotPassengers;
            TempData["TotVehicles"] = sermodel.TotVehicles;

            return View(sermodel);
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
            Routeselection RouteList = new Routeselection();
            resmodel.Triptype = model.Triptype;
            resmodel.TotPassengers = (Passengers)TempData.Peek("TotPassengers");
            resmodel.TotVehicles = (Vehicles)TempData.Peek("TotVehicles");

            if (model.MultDepList.Count > 0)
            {
                var count = 0;
                foreach (MultipleDeparture multdep in model.MultDepList)
                {
                    count++;
                    resmodel.MultDepList.Add(multdep);
                    resmodel.MultRouteList.Add(RouteList);
                }
                if (count == 1)
                {
                    resmodel.MultRouteList.Add(RouteList);
                }

                TempData["Triptype"] = model.Triptype;
                TempData["MultDepList"] = model.MultDepList;
                TempData["MultRouteList"] = resmodel.MultRouteList;
            }
            else
            {
                foreach (MultipleDeparture multdep in (List<MultipleDeparture>)TempData.Peek("MultDepList"))
                {
                    resmodel.MultDepList.Add(multdep);
                }

                foreach (Routeselection multroute in (List<Routeselection>)TempData.Peek("MultRouteList"))
                {
                    resmodel.MultRouteList.Add(multroute);
                }

                resmodel.Triptype = (Triptype)TempData.Peek("Triptype");
            }

            return View(resmodel);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Passengers(ResultsModel model)
        {
            PassengersModel passmodel = new PassengersModel();
            passmodel.MultDepList = new List<MultipleDeparture>();
            passmodel.MultRouteList = new List<Routeselection>();
            passmodel.TotPassengers = (Passengers)TempData.Peek("TotPassengers");
            passmodel.TotVehicles = (Vehicles)TempData.Peek("TotVehicles");
            passmodel.Triptype = (Triptype)TempData.Peek("Triptype");

            if (model.MultRouteList.Count > 0)
            {
                foreach (MultipleDeparture multdep in (List<MultipleDeparture>)TempData.Peek("MultDepList"))
                {
                    passmodel.MultDepList.Add(multdep);
                }

                foreach (Routeselection multroute in (List<Routeselection>)TempData.Peek("MultRouteList"))
                {
                    passmodel.MultRouteList.Add(multroute);
                }
            }
            else
            {
                foreach (MultipleDeparture multdep in (List<MultipleDeparture>)TempData.Peek("MultDepList"))
                {
                    passmodel.MultDepList.Add(multdep);
                }

                foreach (Routeselection multroute in (List<Routeselection>)TempData.Peek("MultRouteList"))
                {
                    passmodel.MultRouteList.Add(multroute);
                }
            }

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