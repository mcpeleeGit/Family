using Family.Service.Account;
using Family.Account.Model;
using Family.Account.Query;
using Family.Code.Model;
using Family.CodeType.Model;
using JangBoGo.Info.Object;
using JangBoGo.Info.Object.ObjectHelper;
using JangBoGo.Model.Param.Common;
using JangBoGo.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Family.Controllers
{
    public class DevController : AbstractController
    {
        [Autowire]
        public IAccountService AccountService { get; set; }

        #region 코드 관리
        public ActionResult CodeList()
        {
            var list = COD.FindAll<CodeTypeItem>();
            var codelist = COD.FindAll<CodeItem>();
            var param = new CommonParam();
            param.Add("List", list);
            param.Add("CodeList", codelist);
            return View(param);
        }


        #region CodeType Update
        public ActionResult CodeTypeUpdateFor(string codetype)
        {
            var item = COD.FindItemByParam<CodeTypeItem>(new DbParam().Add("CodeType", codetype), "*");
            var commonParam = new CommonParam();
            commonParam.Add("Item", item);
            commonParam.Add("state", MvcUtil.GetSelectList(item.State, "REG=REG,DEL=DEL"));
            return PartialView("~/Views/Dev/Partial/CodeList/CodeTypeUpdatePartial.cshtml", commonParam);
        }

        public JsonResult CodeTypeUpdate(string codetype, FormCollection formValues)
        {
            var item = COD.FindItemByParam<CodeTypeItem>(new DbParam().Add("CodeType", codetype), "*");
            UpdateModel(item);
            COD.Update(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region CodeType Write
        public ActionResult CodeTypeWriteFor()
        {
            var commonParam = new CommonParam();
            return PartialView("~/Views/Dev/Partial/CodeList/CodeTypeWritePartial.cshtml", commonParam);
        }
        
        public JsonResult CodeTypeWrite(CodeTypeItem item)
        {
            item.State = "REG";
            item.RegDate = DateTime.Now;
            COD.Insert(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region CodeType Delete

        public JsonResult CodeTypeDelete(string codetype)
        {
            var item = COD.FindItemByParam<CodeTypeItem>(new DbParam().Add("CodeType", codetype), "*");
            COD.Delete(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }
        #endregion
        

        #region Code Update
        public ActionResult CodeUpdateFor(string code)
        {
            var item = COD.FindItemByParam<CodeItem>(new DbParam().Add("Code", code), "*");
            var commonParam = new CommonParam();
            commonParam.Add("Item", item);
            commonParam.Add("state", MvcUtil.GetSelectList(item.State, "REG=REG,DEL=DEL"));
            return PartialView("~/Views/Dev/Partial/CodeList/CodeUpdatePartial.cshtml", commonParam);
        }

        public JsonResult CodeUpdate(string code, FormCollection formValues)
        {
            var item = COD.FindItemByParam<CodeItem>(new DbParam().Add("Code", code), "*");
            UpdateModel(item);
            COD.Update(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Code Write
        public ActionResult CodeWriteFor(string codetype)
        {
            var commonParam = new CommonParam();
            commonParam.Add("CodeType", codetype);
            return PartialView("~/Views/Dev/Partial/CodeList/CodeWritePartial.cshtml", commonParam);
        }

        public JsonResult CodeWrite(CodeItem item)
        {
            item.State = "REG";
            item.RegDate = DateTime.Now;
            COD.Insert(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Code Delete

        public JsonResult CodeDelete(string code)
        {
            var item = COD.FindItemByParam<CodeItem>(new DbParam().Add("Code", code), "*");
            COD.Delete(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #endregion

        #region 가계부 관리
        public ActionResult AccountList()
        {
            var list = COD.FindAll<AccountItem>();
            var param = new CommonParam();
            param.Add("List", list);
            return View(param);
        }

        #region Account Update
        public ActionResult AccountUpdateFor(int id)
        {
            var inOutCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "INOUT"), "*");
            var caseCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "ACCOUNT"), "*");
            var cardBankCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "CARDBANK"), "*");
            var item = COD.FindItemById<AccountItem>(id);
            var commonParam = new CommonParam();
            commonParam.Add("Item", item);
            commonParam.Add("inOutCode", new SelectList(inOutCodeList, "Code", "CodeName", item.InOutCode));
            commonParam.Add("caseCode", new SelectList(caseCodeList, "Code", "CodeName", item.CaseCode));
            commonParam.Add("cardBankCode", new SelectList(cardBankCodeList, "Code", "CodeName", item.CardBankCode));
            commonParam.Add("state", MvcUtil.GetSelectList(item.State, "REG=REG,DEL=DEL"));
            return PartialView("~/Views/Dev/Partial/AccountList/AccountUpdatePartial.cshtml", commonParam);
        }

        public JsonResult AccountUpdate(int id, FormCollection formValues)
        {
            var item = COD.FindItemById<AccountItem>(id);
            UpdateModel(item);
            COD.Update(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Account Write
        public ActionResult AccountWriteFor()
        {
            var inOutCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "INOUT"), "*");
            var caseCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "ACCOUNT"), "*");
            var cardBankCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "CARDBANK"), "*");

            var commonParam = new CommonParam();
            commonParam.Add("inOutCode", new SelectList(inOutCodeList, "Code", "CodeName", ""));
            commonParam.Add("caseCode", new SelectList(caseCodeList, "Code", "CodeName", ""));
            commonParam.Add("cardBankCode", new SelectList(cardBankCodeList, "Code", "CodeName", ""));
            return PartialView("~/Views/Dev/Partial/AccountList/AccountWritePartial.cshtml", commonParam);
        }

        public JsonResult AccountWrite(AccountItem item)
        {
            item.State = "REG";
            item.RegDate = DateTime.Now;
            COD.Insert(item);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Account MultiExcel Write
        public ActionResult AccountMultiExcelWriteFor()
        {
            var inOutCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "INOUT"), "*");
            var caseCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "ACCOUNT"), "*");
            var cardBankCodeList = COD.FindListByParam<CodeItem>("Code", new DbParam().Add("CodeType", "CARDBANK"), "*");

            var commonParam = new CommonParam();
            commonParam.Add("inOutCode", new SelectList(inOutCodeList, "Code", "CodeName", ""));
            commonParam.Add("caseCode", new SelectList(caseCodeList, "Code", "CodeName", ""));
            commonParam.Add("cardBankCode", new SelectList(cardBankCodeList, "Code", "CodeName", ""));
            return PartialView("~/Views/Dev/Partial/AccountList/AccountMultiExcelWritePartial.cshtml", commonParam);
        }

        public JsonResult AccountMultiExcelWrite(string excelData)
        {
            AccountService.ProcMulitExcelInsert(excelData);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        

        #region Account Delete

        public JsonResult AccountDelete(int id)
        {
            COD.Delete<AccountItem>(id);
            return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #endregion

        #region 가계부 표시
        public ActionResult AccountView()
        {
            return View();
        }

        public JsonResult GetAccountView(int year, int month)
        {
            var list = COD.FindList<AccountItem>(AccountQuery.FindAccountView(year, month));
            return Json(new { result = "success", list = list }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}