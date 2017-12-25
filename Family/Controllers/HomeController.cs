using Adprint.RequestSearch.Model;
using Adprint.Service.RequestSearch;
using JangBoGo.Info.Object;
using JangBoGo.Info.Object.ObjectHelper;
using JangBoGo.Model.Param.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Family.Controllers
{
    public class HomeController : AbstractController
    {
        [Autowire]
        public IRequestSearchService RequestSearchService { set; get; }

        public ActionResult Index()
        {
            var list = RequestSearchService.FindAll();
            var param = new CommonParam();
            param.Add("List", list);
            return View(param);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        
    }
}