using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;
using Newtonsoft.Json.Serialization;

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
        public string Boatcompany { get; set; }

        [Required]
        public string Boatname { get; set; }

        
        [Required(ErrorMessage = @"Συμπληρώστε Ημ/νια Αναχώρησης")]
        [Display(Name = "Ημ/νια αναχώρησης")]
        [DataType(DataType.Date)]
        public string Deptime { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε ώρα Αναχώρησης")]
        [Display(Name = "Ώρα αναχώρησης")]
        [DataType(DataType.Time)]
        public string Arrtime { get; set; }

        [Required]
        public float Price { get; set; }

        [Required]
        public int Vesselid { get; set; }
    }
}