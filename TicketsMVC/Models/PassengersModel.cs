using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace TicketsMVC.Models
{
    public class PassengersModel : ResultsModel
    {

        public List<Passengerinfo> MultPassengerList
        {
            get { return _multPassengers; }
            set { _multPassengers = value; }
        }

        private List<Passengerinfo> _multPassengers = new List<Passengerinfo>();
    }

    public class Passengerinfo
    {
        [Required]
        public string gender { get; set; }

        [Required]
        public string firstname { get; set; }

        [Required]
        public string lastname { get; set; }

        [Required]
        public string typepassenger { get; set; }

        [Required]
        public string seatclass { get; set; }

        [Required]
        public string typeseat { get; set; }
    }
}