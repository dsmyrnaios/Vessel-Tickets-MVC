using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace TicketsMVC.Models
{
    public class ResultsModel : SearchModel
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
        [Required]
        public string boatcompany { get; set; }

        [Required]
        public string boatname { get; set; }

        [Required]
        public float deptime { get; set; }

        [Required]
        public float arrtime { get; set; }

        [Required]
        public float price { get; set; }

        [Required]
        public int vesselid { get; set; }
    }
}