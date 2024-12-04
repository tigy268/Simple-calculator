let isSumUP=false;// status if value was sumed up
let insert=false;// value is inserting
let result=' ';
let isOperationActive=true;//flag-layer checking if operation can be choose
let isOperationExtra=false; //state for selecting a number
let numberToSet; //true-> vA false-> vB
let isPercentStep;
let isDefault;
let isOperatorSetting;
let a='';
let b='';
let vA;
let vB;
let operatorGlobal;

const DisplayMng={
    getMain(){return document.getElementById("screenMainPart").innerHTML },
    getPreview(){return document.getElementById("screenPreviewPart").innerHTML },
    setPreview(value){document.getElementById("screenPreviewPart").innerHTML=scaling(value)},
    setMain(value){document.getElementById("screenMainPart").innerHTML=scaling(value)}
            }
function cls()
{

    if(!(isDefault || isSumUP || isOperationExtra || isPercentStep))
    { 
        let toSlice=DisplayMng.getMain();
        a=toSlice.slice(0,toSlice.length-1)
    }
     
    if(isSumUP)
    {
        DisplayMng.setPreview('');
    }
        if(a=='')
        { 
            a=0;
        }     
        if(a==0)
        {
            isDefault=true;   
        }
        
        DisplayMng.setMain()=a;
}

function clearOperation(opr)
{
    switch(opr)
    {
    case 'C':
        defaultState();
    break;
    case 'CE':
        if(!isOperationActive || isSumUP) return defaultState();
            DisplayMng.setMain(vB=b=0);
            break;
    }
    
    isOperationActive=true;
}
function defaultState()
{
    isPercentStep=false;
    numberToSet=true;
    isSumUP=false;
    isDefault=true;
    DisplayMng.setMain(0);
    DisplayMng.setPreview("");
    a='';
    b=0;
    vA=DisplayMng.getMain();
}

function operation(operator)
{   
    isDefault=true;
    let preview=document.getElementById("screenPreviewPart");
    if(isSumUP)
    {isSumUP=false;
        vB=b=Number(DisplayMng.getMain());
        preview.innerHTML=vA+operator;
        operatorGlobal=operator;
     
         return;
    }
 
  if(DisplayMng.getPreview()==''&& numberToSet)
    {      vA=a=Number(DisplayMng.getMain());
        preview.innerHTML=vA+operator;
        operatorGlobal=operator;
        isOperatorSetting=true;
        numberToSet=false;
    }
    else if(numberToSet)
    { 
        preview.innerHTML=vA+operator;
        operatorGlobal=operator;
        isOperatorSetting=true;
        numberToSet=false; 
    }
    
  if(isOperatorSetting)
  {
    preview.innerHTML=preview.innerHTML.slice(0,-1)+operator;

    
    return operatorGlobal=operator;
  }

    a=Number(a);
    b=Number(b);

    switch(operatorGlobal)
        { 
    case '+':
       vA=a=a+b;
    break;
    case '-':
        vA=a=a-b;
    break;          
    case '*':
        vA=a=a*b;
    break;
    case '÷':
        if(Number.isFinite(a/b))
        {
            vA=a=a/b;
            
        }
        else
        {
            SetButtonsEnable(false);
        }
    break;
       }
       operatorGlobal=operator;
       vB=b=a;
       preview.innerHTML=vA+operator;
       isOperatorSetting=true;
    }

    function extraOperation(mark)
    {
        let visualOpr;
        switch(mark)
        {
          case'^':
              OperationToInvoke = (param) => Math.pow(param, 2);
              visualOpr='sqr(';
          break;
          case 'sqrR':
              OperationToInvoke = (param) => Math.sqrt(param);
              visualOpr='√(';
          break;
          case 'fract':
              OperationToInvoke = (param) => 1/param;
              visualOpr='1/(';
          break;
        }
       
        if(isSumUP || numberToSet) 
            {
             vA=DisplayMng.getPreview()==''?`${visualOpr}${DisplayMng.getMain()})`:`${visualOpr}${vA})`;
             DisplayMng.setPreview(vA);
             DisplayMng.setMain(a=OperationToInvoke(DisplayMng.getMain()));
            
            }else
            {
             vB=DisplayMng.getPreview()==''?`${visualOpr}${DisplayMng.getMain()})`:`${visualOpr}${vB})`;
             DisplayMng.setPreview(vA+operatorGlobal+vB);
             DisplayMng.setMain(b=OperationToInvoke(DisplayMng.getMain()));
            
            }
            isOperationExtra=true;

    }

function addNumber(num)
{   
    if(isDefault || isSumUP || isOperationExtra || isPercentStep|| DisplayMng.getMain()=='0')
    {
        if(isSumUP)
        {
            defaultState();
            isSumUP=false;
        }
        
        if(isPercentStep)
        {
            if(!numberToSet)DisplayMng.setPreview(`${vA}${operatorGlobal}`);
            isPercentStep=false;
        }
        DisplayMng.setMain(num);
        vB=b=Number(DisplayMng.getMain());
        isDefault=false;
        isOperationExtra=false;
        isPercentStep=false;
    }
    else
    {  
        DisplayMng.setMain(DisplayMng.getMain()+num);
        vB=b=Number(DisplayMng.getMain());
    }
    
    isOperatorSetting=false;
        
}

function basefunction(option,parameter)
{ 
    if(isOperationActive)
     {
        switch(option)
        {
         
         case "operation":operation(parameter)
         break;
     
         case "fltp": floatingPoint()
         break;
     
         case "negate": negate()
         break;

         case "ext":extraOperation(parameter)
            break;

         case "percent":percent()
         break;
     
        }
    }
}

function negate()
{   
    let preview=document.getElementById("screenPreviewPart");
    let main=document.getElementById("screenMainPart");

    if(isSumUP)
        {
            DisplayMng.setMain(a)=a=-1*a;
            vA='negate('+vA+')';
            preview.innerHTML=vA;
            return;
        }
        else if(operatorGlobal!==undefined)
        {
        
            main.innerHTML=b=-1*b;
            vB='negate('+vB+')';
            preview.innerHTML=vA+operatorGlobal+vB;
        }
        
       if(operatorGlobal===undefined)
       {
            return main.innerHTML=vA=a=-1*Number(main.innerHTML);
       }

}
function percent()
{
    a=DisplayMng.getPreview()==''? 0 : a;
    b=DisplayMng.getMain();
    b=(b/100)*a;
    b=Math.round((b+Number.EPSILON)*100)/100;
    if(isSumUP|| operatorGlobal==undefined)
    {
        vA=b;
    }
    else
    {
        vB=b
    }
    DisplayMng.setMain(b);
    DisplayMng.setPreview(isSumUP|| operatorGlobal==undefined?vA:`${vA}${operatorGlobal}${vB}`);
    isPercentStep=true;
}

function sumUp()
{
    if(DisplayMng.getMain()=='0.')DisplayMng.setMain(0);
if(operatorGlobal===undefined) 
{
   
    DisplayMng.setPreview(b+' =');
    return isSumUP=true;
}
    
    
    switch(operatorGlobal)
    {
     case '+':
        result=a+b;
     break;
     case '-':
         result=a-b;
         
     break;
     case '*':
         result=a*b;
     
     break;
     case '÷':
        if(Number.isFinite(a/b))
        {
            result=a/b;
        }
        else
        {
            return SetButtonsEnable(false);
        }
        
        
     break;
   
    }
 
    isSumUP=true;
    numberToSet=false;
    isOperatorSetting=true;
    DisplayMng.setPreview(vA+operatorGlobal+vB+'=');
    DisplayMng.setMain(result);
    vA=a=result;
}

function floatingPoint()
{
    if(isSumUP) defaultState();
    if(b=='' && !DisplayMng.getMain().includes('.'))
    {
        vA=a=DisplayMng.setMain(DisplayMng.getMain()+'.');
        isDefault=false;
    }
    if(!DisplayMng.getMain().includes('.'))
    {
        vB=b=DisplayMng.setMain(DisplayMng.getMain()+'.');
        isDefault=false;
    }
    
}

function scaling(value)
{
    if(value.toString().length>11)
        { 
            document.documentElement.style.setProperty('--screen-number', '10px')
        }
    else if(value.toString().length>8)
        {
            document.documentElement.style.setProperty('--screen-number', '14px')
        }
    else
        {
            document.documentElement.style.setProperty('--screen-number', '18px')
        }
return value;
}