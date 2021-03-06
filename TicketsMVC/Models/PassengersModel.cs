﻿using System.Collections.Generic;
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
        public string studentpass { get; set; }

        [Required]
        public string seatclass { get; set; }

        [Required]
        public string typeseat { get; set; }

        [Required]
        public List<Typecar> MultPassengerList
        {
            get { return _multTypecar; }
            set { _multTypecar = value; }
        }

        private List<Typecar> _multTypecar = new List<Typecar>();

    }

    public class Typecar
    {
        [Required]
        public string typecar { get; set; }

        [Required]
        public string carid { get; set; }

    }
}