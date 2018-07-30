#pragma strict

public class JavaCommander extends MonoBehaviour implements
    OuyaSDK.IPauseListener,
    OuyaSDK.IResumeListener,
    OuyaSDK.IMenuButtonUpListener,
    OuyaSDK.IMenuAppearingListener,
   OuyaSDK.IGetProductsListener, OuyaSDK.IPurchaseListener, OuyaSDK.IGetReceiptsListener
{
    
    @HideInInspector var gui:GUI_HUD;
        @HideInInspector var guiMenu:GUI_Menu;
    @HideInInspector var loader:loadingScript;
    
    function Awake()
    {
        OuyaSDK.registerMenuButtonUpListener(this);
        OuyaSDK.registerMenuAppearingListener(this);
        OuyaSDK.registerPauseListener(this);
        OuyaSDK.registerResumeListener(this);
        OuyaSDK.registerGetProductsListener(this);
        OuyaSDK.registerPurchaseListener(this);
        OuyaSDK.registerGetReceiptsListener(this);
        loader = GetComponent(loadingScript);
    }

    function OnDestroy()
    {
        OuyaSDK.unregisterMenuButtonUpListener(this);
        OuyaSDK.unregisterMenuAppearingListener(this);
        OuyaSDK.unregisterPauseListener(this);
        OuyaSDK.unregisterResumeListener(this);
        OuyaSDK.unregisterGetProductsListener(this);
        OuyaSDK.unregisterPurchaseListener(this);
        OuyaSDK.unregisterGetReceiptsListener(this);
    }

    public function OuyaMenuButtonUp()
    {
        Debug.Log(System.Reflection.MethodBase.GetCurrentMethod().ToString());
        Debug.Log("HERE I AM FINALLY WORKING");
        gui = FindObjectOfType(GUI_HUD);
        guiMenu = FindObjectOfType(GUI_Menu);
        
        if(gui)
        {
        	gui.PauseMenu();
        }
        else if(guiMenu)
        {
        	guiMenu.ShowCredits();
        }
    }

    public function OuyaMenuAppearing()
    {
        Debug.Log(System.Reflection.MethodBase.GetCurrentMethod().ToString());
    }

    public function OuyaOnPause()
    {
        Debug.Log(System.Reflection.MethodBase.GetCurrentMethod().ToString());
    }

    public function OuyaOnResume()
    {
        Debug.Log(System.Reflection.MethodBase.GetCurrentMethod().ToString());
    }
    
    public function OuyaGetProductsOnSuccess(products:List.<OuyaSDK.Product> )
    {
        m_products.Clear();
        for (product  in products)
        {
            m_products.Add(product);
        }
        GetReceipts();
        Debug.Log("get receipts");
    }

    public function OuyaGetProductsOnFailure( errorCode:int,  errorMessage:String)
    {
        Debug.LogError(String.Format("OuyaGetProductsOnFailure: error={0} errorMessage={1}", errorCode, errorMessage));
        guiMenu = FindObjectOfType(GUI_Menu);
        if(guiMenu!=null)
        {
        guiMenu.Error();
        }
    }

    public function OuyaGetProductsOnCancel()
    {
        Debug.LogError("OuyaGetProductsOnCancel:");
    }

    public function OuyaPurchaseOnSuccess(product:OuyaSDK.Product )
    {
        // bought it now setting to bought
        
        PlayerPrefs.SetInt("StartCount",10);
        PlayerPrefs.SetString("WW3DPurchased","ofCourseIBoughtIt");
        PlayerPrefs.SetString("NeverLoaded","IHaveBeenLoaded");
        loader.WW3DIsUnlocked = true;
        loader.gameIsUnlocked = true;
        PlayerPrefs.Save();
        Application.LoadLevel(Application.loadedLevelName);
        //-----------------------------------
    }

    public function OuyaPurchaseOnFailure( errorCode:int,  errorMessage:String)
    {
        Debug.LogError(String.Format("OuyaPurchaseOnFailure: error={0} errorMessage={1}", errorCode, errorMessage));
        guiMenu = FindObjectOfType(GUI_Menu);
        if(guiMenu!=null)
        {
        guiMenu.Error();
        }
    }

    public function OuyaPurchaseOnCancel()
    {
        Debug.LogError("OuyaPurchaseOnCancel:");
    }

    public function OuyaGetReceiptsOnSuccess(receipts:List.<OuyaSDK.Receipt> )
    {
        m_receipts.Clear();
       Debug.Log("Got receipts");
       var purchased=false;
         for (receipt in receipts)
        {
            m_receipts.Add(receipt);
            if(receipt.getIdentifier() == m_products[0].getIdentifier() || receipt.getIdentifier() == m_products[1].getIdentifier())
            {
            //already purchased
            purchased=true;
            PlayerPrefs.SetInt("StartCount",10);
            PlayerPrefs.SetString("WW3DPurchased","ofCourseIBoughtIt");
        	PlayerPrefs.SetString("NeverLoaded","IHaveBeenLoaded");
        	loader.WW3DIsUnlocked = true;
        	 loader.gameIsUnlocked = true;
        	PlayerPrefs.Save();
        	Application.LoadLevel(Application.loadedLevelName);
            //CREDIT PURCHASE HERE AND SET TO BOUGHT
            
            }
        }
        
        if(!purchased && PlayerPrefs.GetInt("StartCount") <2 )
        {
        	PurchaseDiscount();
        }
        else if(!purchased)
        {
        	Purchase();
        }
        
    }

    public function OuyaGetReceiptsOnFailure( errorCode:int,  errorMessage:String)
    {
        Debug.LogError(String.Format("OuyaGetReceiptsOnFailure: error={0} errorMessage={1}", errorCode, errorMessage));
        guiMenu = FindObjectOfType(GUI_Menu);
        if(guiMenu!=null)
        {
        guiMenu.Error();
        }
    }

    public function OuyaGetReceiptsOnCancel()
    {
        Debug.LogError("OuyaGetReceiptsOnCancel:");
    }

  //  #region Data containers

    private var m_products:List.<OuyaSDK.Product>  = new List.<OuyaSDK.Product>();

    private var m_receipts:List.<OuyaSDK.Receipt>  = new List.<OuyaSDK.Receipt>();

  //  #endregion
  
  function GetProducts()
  {
  Debug.Log("getting products");
  	var productIdentifierList:List.<OuyaSDK.Purchasable>  = new List.<OuyaSDK.Purchasable>();

                for (productId in OuyaGameObject.Singleton.Purchasables)
                {
                    productIdentifierList.Add(new OuyaSDK.Purchasable(productId));
                }
Debug.Log("getting productsvvvv");
                OuyaSDK.requestProductList(productIdentifierList);
  }
  
  function GetDProducts()
  {
  Debug.Log("getting products");
  	var productIdentifierList:List.<OuyaSDK.Purchasable>  = new List.<OuyaSDK.Purchasable>();

                for (productId in OuyaGameObject.Singleton.Purchasables)
                {
                    productIdentifierList.Add(new OuyaSDK.Purchasable(productId));
                }
Debug.Log("getting productsvvvv");
                OuyaSDK.requestProductList(productIdentifierList);
  }
  
  function Purchase()
  {
  	Debug.Log("buying stuff");
  	OuyaSDK.requestPurchase(m_products[0].getIdentifier());
  }
  
  function PurchaseDiscount()
  {
  	Debug.Log("buying discounted stuff");
  	OuyaSDK.requestPurchase(m_products[1].getIdentifier());
  }
  
  function GetReceipts()
  {
  	OuyaSDK.requestReceiptList();
  	Debug.Log("getting receipts");
  }
  
}
