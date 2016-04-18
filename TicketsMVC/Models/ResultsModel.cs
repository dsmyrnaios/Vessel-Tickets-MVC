using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicketsMVC.Models
{
    public class ResultsModel : SearchViewModel
    {
        public List<Routeselection> MultRouteList
        {
            get { return _multRoutes; }
            set { _multRoutes = value; }
        }

        private List<Routeselection> _multRoutes = new List<Routeselection>();
    }

    public class Routeselection
    {
        public string boatcompany { get; set; }
        public string boatname { get; set; }
        public float deptime { get; set; }
        public float arrtime { get; set; }
        public float price { get; set; }
        public int vesselid { get; set; }
    }
}