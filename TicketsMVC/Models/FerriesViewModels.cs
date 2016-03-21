using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace TicketsMVC.Models
{
    public enum Triptype : int { Simple = 0, WithReturn = 1, Multiple = 2 };

    public class TicketstrnsactionModel
    {
        public SearchViewModel SearchModel { get; set; }

    }

    public class SearchViewModel
    {
        [Required(ErrorMessage = @"Παρακαλώ επιλέξτε λιμάνι αναχώρησης")]
        [Display(Name = "Από")]
        public String FromPort { get; set; }

        
        [Required(ErrorMessage = @"Παρακαλώ επιλέξτε λιμάνι προορισμού")]
        [Display(Name = "Πρός")]
        public String ToPort { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε Ημ/νια Αναχώρησης")]
        [Display(Name = "Αναχώρηση")]
        public DateTime? DateFrom { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε Ημ/νια Επιστροφής")]
        [Display(Name = "Επιστροφή")]
        public DateTime? DateTo { get; set; }

        private Triptype triptype;

        [Required]
        [Display(Name = "Είδος ταξιδιού")]
        public Triptype Triptype { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε αριθμό επιβατών")]
        [Display(Name = "Επιβάτες")]
        public int NumOfPassengers { get { return numpassengers; } set{ } }
        private int numpassengers = 1;

        [Required(ErrorMessage = @"Συμπληρώστε αριθμό οχημάτων")]
        [Display(Name = "Οχήματα")]
        public int NumOfVehicles { get; set; }
        

        public List<MultipleDeparture> MultDepList
        {
            get { return _multDepartures; }
        }

        private List<MultipleDeparture> _multDepartures = new List<MultipleDeparture>();

        [Display(Name = "Ενήλικες")]
        public int NumOfAdults { get; set; }

        [Display(Name = "Έφηβοι")]
        public int NumOfTeens { get; set; }

        [Display(Name = "Παιδιά")]
        public int NumOfKids { get; set; }

        [Display(Name = "Βρέφη")]
        public int NumOfInfants { get; set; }

        [Display(Name = "Ηλικιωμένοι")]
        public int NumOfOlders { get; set; }

        [Display(Name = "Αυτοκίνητα")]
        public int NumOfCars { get; set; }

        [Display(Name = "Μηχανές")]
        public int NumOfMotos { get; set; }

        [Display(Name = "Τρέιλερ")]
        public int NumOfTrailers { get; set; }

        [Display(Name = "Μινι λεωφορεία")]
        public int NumOfMiniBuses { get; set; }


    }

    public class MultipleDeparture
    {
        [Required(ErrorMessage = @"Παρακαλώ επιλέξτε λιμάνι αναχώρησης")]
        [Display(Name = "Από")]
        public String FromPort { get; set; }


        [Required(ErrorMessage = @"Παρακαλώ επιλέξτε λιμάνι προορισμού")]
        [Display(Name = "Πρός")]
        public String ToPort { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε Ημ/νια Αναχώρησης")]
        [Display(Name = "Αναχώρηση")]
        public DateTime DateFrom { get; set; }
    }


}