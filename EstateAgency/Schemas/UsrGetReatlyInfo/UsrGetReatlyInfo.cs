 namespace EstateAgency.Services.UsrGetReatlyInfo
{
	using System;
	using System.Collections.Generic;
	using System.Runtime.Serialization;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
    using System.Data;
	using Terrasoft.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Web.Common;
	using Terrasoft.Common;

	 

	#region Class: RequestModel

	[DataContract]
	public class RequestModel 
	{
		[DataMember(Name = "typeId")]
		public Guid TypeId { get; set; } 
		
		[DataMember(Name = "typeOfferId")]
		public Guid TypeOfferId { get; set; } 

		 
	}

	#endregion
    #region Class: ResponseModel 
    [DataContract]
    public class ResponseModel : ConfigurationServiceResponse
    {
        [DataMember(Name = "sum")]
        public double Sum { get; set; } 
    }
    #endregion
	#region Class: ReatlyService

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class ReatlyService : BaseService
	{
		#region Methods: protected
        protected double GetInfo(Guid typeId,Guid typeOfferId){
            Select sel = (Select)new Select (UserConnection)
                .Column("UsrName")
                .Column("UsrNotes")
                .Column("UsrPrice")
                .Column("UsrSquare")
                .Column("UsrTypeId")
                .Column("UsrTypeOfferId")
                .From("UsrEstate")
                .Where()
                .OpenBlock()
                            .OpenBlock("UsrTypeId").IsEqual(Column.Parameter(typeId))
                            .And("UsrTypeOfferId").IsEqual(Column.Parameter(typeOfferId))
                            .CloseBlock(); 
                 
                double sumPrice=0;
                using (DBExecutor dbExecutor = UserConnection.EnsureDBConnection()) {
                    using (IDataReader reader = sel.ExecuteReader(dbExecutor)) {
                        while (reader.Read()) {
                                    sumPrice+=reader.GetColumnValue<double>(reader.GetName(2)) ;
                                 
                        }
                    }
                }
                return sumPrice;
        } 
		#endregion

		#region Methods: public

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public virtual ResponseModel ReatlyDetail(RequestModel shell) {
			 
			var result = new ResponseModel();
			if (shell is null) {
				result.Exception = new Exception("Request shell is null");
                result.Success=false;
				return result;
			}
			try {
				if (shell.TypeId==Guid.Empty ||shell.TypeOfferId==Guid.Empty )  {
                        result.Exception = new Exception("Request shell is null");
                        result.Success=false;
                        result.Sum=-1;
				    return result;
                }
			    result.Sum=GetInfo(shell.TypeId,shell.TypeOfferId);
				return result;
			}catch (Exception ex) {
				result.Exception = ex;
			}
			return result;
		}

		#endregion
	}
}
	#endregion
