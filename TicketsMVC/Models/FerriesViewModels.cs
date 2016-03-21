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
        public int NumOfPassengers { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε αριθμό οχημάτων")]
        [Display(Name = "Οχήματα")]
        public int NumOfVehicles { get; set; }

        public List<MultipleDeparture> MultDepList
        {
            get { return _multDepartures; }
        }

        private List<MultipleDeparture> _multDepartures = new List<MultipleDeparture>();

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