using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace TicketsMVC.Models
{
    public class CustomPortValidation : ValidationAttribute
    {
        private readonly string allports = "[LAV] Λαύριο (Αθήνα), Ελλάδα (Λιμάνι); [PIR] Πειραιάς (Αθήνα), Ελλάδα (Λιμάνι); [RAF] Ραφήνα (Αθήνα), Ελλάδα (Λιμάνι);[ANA] ANAFI, Ελλάδα (Λιμάνι);[AIG] Αιγιάλη (Αμοργός), Ελλάδα (Λιμάνι);[AND] Άνδρος, Ελλάδα (Λιμάνι);[JTY] Αστυπάλαια, Ελλάδα (Λιμάνι);[DON] Δοννούσα, Ελλάδα (Λιμάνι);[IRK] Ηρακλειά, Ελλάδα (Λιμάνι);[JTR] Θήρα (Σαντορίνη), Ελλάδα (Λιμάνι);[TRS] Θηρασσιά (Σαντορίνη), Ελλάδα (Λιμάνι);[IOS] Ιος, Ελλάδα (Λιμάνι);[AMO] Κατάπολα (Αμοργός), Ελλάδα (Λιμάνι);[KEA] Κέα, Ελλάδα (Λιμάνι);[KMS] Κίμωλος, Ελλάδα (Λιμάνι);[KOU] Κουφονήσι, Ελλάδα (Λιμάνι);[KYT] Κύθνος, Ελλάδα (Λιμάνι);[MLO] Μήλος, Ελλάδα (Λιμάνι);[JMK] Μύκονος, Ελλάδα (Λιμάνι);[JNX] Νάξος, Ελλάδα (Λιμάνι);[PAS] Πάρος, Ελλάδα (Λιμάνι);[PMS] Πάτμος, Ελλάδα (Λιμάνι);[SER] Σέριφος, Ελλάδα (Λιμάνι);[SIK] Σίκινος, Ελλάδα (Λιμάνι);[SIF] Σίφνος, Ελλάδα (Λιμάνι);[JSY] Σύρος, Ελλάδα (Λιμάνι);[SXI] Σχοινούσσα, Ελλάδα (Λιμάνι);[TIN] Τήνος, Ελλάδα (Λιμάνι);[FOL] Φολέγανδρος, Ελλάδα (Λιμάνι);[MET] METHANA, Ελλάδα (Λιμάνι); [POR] POROS, Ελλάδα (Λιμάνι); [AGS] Αγκίστρι, Ελλάδα (Λιμάνι); [AGG] Αγκίστρι-Μύλι, Ελλάδα (Λιμάνι); [AEG] Αίγινα (Αίγινα), Ελλάδα (Λιμάνι); [ERM] Ερμιόνη, Ελλάδα (Λιμάνι); [PHE] Πόρτο Χέλι, Ελλάδα (Λιμάνι); [SPE] Σπέτσες, Ελλάδα (Λιμάνι); [HYD] Ύδρα, Ελλάδα (Λιμάνι);[ROU] AG.ROUMELI, Ελλάδα (Λιμάνι);[GVD] GAVDOS, Ελλάδα (Λιμάνι);[KIS] KISSAMOS, Ελλάδα (Λιμάνι);[LTR] LOUTRO CHANION (Κρήτη), Ελλάδα (Λιμάνι);[RNO] RETHIMNO (Κρήτη), Ελλάδα (Λιμάνι);[CSF] SFAKIA (Κρήτη), Ελλάδα (Λιμάνι);[JSH] SITIA (Κρήτη), Ελλάδα (Λιμάνι);[SOG] SOUGIA, Ελλάδα (Λιμάνι);[HER] Ηράκλειο (Κρήτη), Ελλάδα (Λιμάνι);[CHA] Χανιά (Κρήτη), Ελλάδα (Λιμάνι);[AKT] ANTIKYTHIRA, Ελλάδα (Λιμάνι);[VAT] ITHAKI(VATHI), Ελλάδα (Λιμάνι);[KTH] KYTHIRA, Ελλάδα (Λιμάνι);[PAX] PAXI, Ελλάδα (Λιμάνι);[ZTH] Ζάκυνθος, Ελλάδα (Λιμάνι);[IGO] Ηγουμενίτσα, Ελλάδα (Λιμάνι);[ITH] Ιθάκη, Ελλάδα (Λιμάνι);[CFU] Κέρκυρα (Κέρκυρα), Ελλάδα (Λιμάνι);[KIL] Κυλλήνη, Ελλάδα (Λιμάνι);[GRA] Πάτρα, Ελλάδα (Λιμάνι);[PSA] Πισαετός (Ιθάκη), Ελλάδα (Λιμάνι);[SMI] Σάμη (Κεφαλονιά), Ελλάδα (Λιμάνι);[AGC] Αγ. Κωνσταντίνος, Ελλάδα (Λιμάνι);[ALO] Αλόννησος, Ελλάδα (Λιμάνι);[VOL] Βόλος, Ελλάδα (Λιμάνι);[GLO] Γλώσσα, Ελλάδα (Λιμάνι);[JSI] Σκιάθος, Ελλάδα (Λιμάνι);[SKO] Σκόπελος (Σκόπελος), Ελλάδα (Λιμάνι);[AGA] AGATHONISI, Ελλάδα (Λιμάνι);[AXL] ALEX/POLI, Ελλάδα (Λιμάνι);[CHR] CHRISOMHLEA(FOURNOI), Ελλάδα (Λιμάνι);[INO] INOUSSES, Ελλάδα (Λιμάνι);[KAV] KAVALA, Ελλάδα (Λιμάνι);[MAS] MASTIHARI, Ελλάδα (Λιμάνι);[PRI] PRINOS, Ελλάδα (Λιμάνι);[SAM] SAMOTHRAKI, Ελλάδα (Λιμάνι);[THA] THASSOS, Ελλάδα (Λιμάνι);[THY] THIMAINA(FOURNOI), Ελλάδα (Λιμάνι);[AES] Αγ. Ευστράτιος, Ελλάδα (Λιμάνι);[AGK] Αγ. Κήρυκος (Ικαρία), Ελλάδα (Λιμάνι);[BTH] Βαθύ (Σάμος), Ελλάδα (Λιμάνι);[EYD] Εύδηλος (Ικαρία), Ελλάδα (Λιμάνι);[SKG] Θεσσαλονίκη, Ελλάδα (Λιμάνι);[KAR] Καρλόβασι (Σάμος), Ελλάδα (Λιμάνι);[LES] Λέσβος (Λέσβος), Ελλάδα (Λιμάνι);[LMN] Λήμνος (Λήμνος), Ελλάδα (Λιμάνι);[PYT] Πυθαγόρειο, Ελλάδα (Λιμάνι);[FOU] Φούρνοι, Ελλάδα (Λιμάνι);[CHI] Χίος, Ελλάδα (Λιμάνι);[PHA] Ψαρά, Ελλάδα (Λιμάνι);[MRM] MARMARI, Ελλάδα (Λιμάνι);[NST] NEA STIRA, Ελλάδα (Λιμάνι);[GYT] GYTHIO, Ελλάδα (Λιμάνι); [NEA] NEAPOLIS, Ελλάδα (Λιμάνι);[ANC] ANCONA (Ανκόνα), Ιταλία (Λιμάνι); [VEN] VENICE (Βενετία), Ιταλία (Λιμάνι); [BAR] Μπάρι (Μπάρι), Ιταλία (Λιμάνι);[KUS] KUSADASI (Κουσάντασι), Τουρκία (Λιμάνι); [MAR] MARMARIS, Τουρκία (Λιμάνι)";

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                string port = value.ToString();
                List<string> portls = allports.Split(';').ToList();
                portls.ForEach(x => x.TrimEnd().TrimStart());

                if (portls.Contains(port.TrimEnd().TrimStart()))
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult("Εισάγετε σωστό όνομα λιμανιού");
                }
            }
            else
            {
                return new ValidationResult("" + validationContext.DisplayName + " is required");
            }
        }
    }
}