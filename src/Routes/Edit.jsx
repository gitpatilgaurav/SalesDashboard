import React, { useState,useEffect} from "react";
import { useParams } from "react-router";
import TextInput from "./FormComponents/TextInput";
import NumberInput from "./FormComponents/NumberInput";
import DateInput from "./FormComponents/DateInput";
import SelectInput from "./FormComponents/SelectInput";
import SuccessMessage from "./FormComponents/SuccessMessage";
import ResetForm from "./FormComponents/ResetForm";
import { useSelector } from "react-redux/es/hooks/useSelector";


export default function Form(props) {
  const apiData = useSelector((state) => state.ApiReducer);
  console.log(apiData)

  const [fetchedData, setFetchedData] = useState({});
  const [product_category, setProductCategory] = useState("");
  const [sub_category, setSubCategory] = useState("");
  const [unit_price, setUnitPrice] = useState("");
  const [unit_cost, setUnitCost] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customer_age, setAge] = useState("");
  const [customer_gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [year, setYear] = useState(""); 
  const [month, setMonth] = useState(""); 
  const [productCategoryError, setProductCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState("");
  const [unitCostError, setUnitCostError] = useState("");
  const [dateError, setDateError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const { index } = useParams();

  const validateStringInput = (inputValue) => {
    if (/^[A-Za-z][A-Za-z\s]*$/.test(inputValue)) {
      return { value: inputValue, error: null };
    }
    return {
      value: inputValue,
      error: "Only alphabets and spaces are allowed",
    };
  };
  
  useEffect(() => {
    const selectedItem = apiData.find((data) => data.index === parseInt(index));
  
    if (selectedItem) {
      setFetchedData(selectedItem);
      setProductCategory(selectedItem.product_category);
      setSubCategory(selectedItem.sub_category);
      setUnitPrice(selectedItem.unit_price);
      setUnitCost(selectedItem.unit_cost);
      setDate(selectedItem.date);
      setQuantity(selectedItem.quantity);
      setAge(selectedItem.customer_age);
      setGender(selectedItem.customer_gender);
      setCountry(selectedItem.country);
      setState(selectedItem.state);
  
      const selectedDate = new Date(selectedItem.date);
      if (!isNaN(selectedDate.getTime())) {
        const year = selectedDate.getFullYear();
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[selectedDate.getMonth()];
        setYear(year.toString());
        setMonth(month);
      }
    }
  }, [apiData, index]);
  

  const validateNumericInput = (inputValue) => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue) && numericValue >= 0) {
      return { value: numericValue, error: null };
    }
    return {
      value: inputValue,
      error: "Please enter a valid positive number.",
    };
  };

  function onProductCategoryChange(event) {
    const { value, error } = validateStringInput(event.target.value);
    setProductCategoryError(error);
    setProductCategory(value);
  }

  function onSubCategoryChange(event) {
    const { value, error } = validateStringInput(event.target.value);
    setSubCategory(value);
    setSubCategoryError(error);
  }

  function onUnitPriceChange(event) {
    const { value, error } = validateNumericInput(event.target.value);
    setUnitPrice(value);
    setUnitPriceError(error);
  }

  function onUnitCostChange(event) {
    const { value, error } = validateNumericInput(event.target.value);
    setUnitCost(value);
    setUnitCostError(error);
  }

  function onDateChange(event) {
    const selectedDate = new Date(event.target.value);
  
    if (!isNaN(selectedDate.getTime())) {

      const year = selectedDate.getFullYear();
  
     
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  
   
      const month = monthNames[selectedDate.getMonth()];
  
      setDate(event.target.value);
      setDateError("");
      setYear(year.toString());
      setMonth(month); 
    } else {
      setDateError("Invalid date format.");
    }
  }
  

  function onQuantityChange(event) {
    const { value, error } = validateNumericInput(event.target.value);
    setQuantity(value);
    setQuantityError(error);
  }

  function onAgeChange(event) {
    const { value, error } = validateNumericInput(event.target.value);
    setAge(value);
    setAgeError(error);
  }

  function onGenderChange(event) {
    const { value } = event.target;
    if (value === "F" || value === "M") {
      setGender(value);
      setGenderError("");
    } else {
      setGenderError("Please select a valid gender.");
    }
  }
  // console.log(gender)

  function onCountryChange(event) {
    const { value, error } = validateStringInput(event.target.value);
    setCountry(value);
    setCountryError(error);
  }

  function onStateChange(event) {
    const { value, error } = validateStringInput(event.target.value);
    setState(value);
    setStateError(error);
  }

  function handleSuccessMessageClose() {
    setShowSuccess(false);
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (
      productCategoryError ||
      subCategoryError ||
      unitPriceError ||
      unitCostError ||
      dateError ||
      quantityError ||
      ageError ||
      genderError ||
      countryError ||
      stateError
    ) {
      // console.log("error");
      return;
    }
  
    let isValid = true;
  
    if (!product_category) {
      setProductCategoryError("Product category is required.");
      isValid = false;
    } else {
      setProductCategoryError("");
    }
  
    if (!sub_category) {
      setSubCategoryError("Sub category is required.");
      isValid = false;
    } else {
      setSubCategoryError("");
    }
  
    if (!unit_price) {
      setUnitPriceError("Unit price is required.");
      isValid = false;
    } else {
      setUnitPriceError("");
    }
  
    if (!unit_cost) {
      setUnitCostError("Unit cost is required.");
      isValid = false;
    } else {
      setUnitCostError("");
    }
  
    if (!date) {
      setDateError("Date is required.");
      isValid = false;
    } else {
      setDateError("");
    }
  
    if (!quantity) {
      setQuantityError("Quantity is required.");
      isValid = false;
    } else {
      setQuantityError("");
    }
  
    if (!customer_age) {
      setAgeError("Age is required.");
      isValid = false;
    } else {
      setAgeError("");
    }
  
    if (!customer_gender) {
      setGenderError("Gender is required.");
      isValid = false;
    } else {
      setGenderError("");
    }
  
    if (!country) {
      setCountryError("Country is required.");
      isValid = false;
    } else {
      setCountryError("");
    }
  
    if (!state) {
      setStateError("State is required.");
      isValid = false;
    } else {
      setStateError("");
    }
  
    if (isValid) {
      const updatedData = {
        index,
        date,
        year: parseInt(year),
        month,
        customer_age,
        customer_gender,
        country,
        state,
        product_category,
        sub_category,
        quantity,
        unit_cost,
        unit_price,
        cost: unit_price * quantity,
        revenue: unit_cost * quantity,
      };
  
      try {
        const response = await fetch(`http://localhost:8000/data/${index}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          console.log("Data updated");
          setShowSuccess(true);
          setSubmittedData(updatedData);
          props.getdata();
        } else {
          console.error("Failed to update");
        } 
      } catch (error) {
        console.error("Error in updating", error);
      }
    }
  }


  return (
    <div className="form-container">
      <h5>Edit Entries</h5>
      <br />
      <div className="form">
        <form onSubmit={onSubmitHandler} method="post">
          <div className="row">
            <div className="col">
              <TextInput
                label="Product Category"
                id="product_category"
                placeholder="Product Category"
                value={product_category}
                onChange={onProductCategoryChange}
              />
              <span className="error">{productCategoryError}</span>
            </div>
            <div className="col">
              <TextInput
                label="Sub Category"
                id="sub_category"
                placeholder="Sub Category"
                value={sub_category}
                onChange={onSubCategoryChange}
              />
              <span className="error">{subCategoryError}</span>
            </div>
            <div className="col">
              <NumberInput
                label="Unit Price"
                id="unit_price"
                placeholder="Unit Price"
                value={unit_price}
                onChange={onUnitPriceChange}
              />
              <span className="error">{unitPriceError}</span>
            </div>
            <div className="col">
              <NumberInput
                label="Unit Cost"
                id="unit_cost"
                placeholder="Unit Cost"
                value={unit_cost}
                onChange={onUnitCostChange}
              />
              <span className="error">{unitCostError}</span>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <DateInput
                label="Date"
                id="date"
                value={date}
                onChange={onDateChange}
              />
              <span className="error">{dateError}</span>
            </div>
            <div className="col">
              <NumberInput
                label="Quantity"
                id="quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={onQuantityChange}
              />
              <span className="error">{quantityError}</span>
            </div>
            <div className="col">
              <NumberInput
                label="Age"
                id="age"
                placeholder="Age"
                value={customer_age}
                onChange={onAgeChange}
              />
              <span className="error">{ageError}</span>
            </div>
            <div className="col">
              <SelectInput
                label="Gender"
                id="gender"
                options={["F", "M"]}
                value={customer_gender}
                onChange={onGenderChange}
              />
              <span className="error">{genderError}</span>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextInput
                label="Country"
                id="country"
                placeholder="Country"
                value={country}
                onChange={onCountryChange}
              />
              <span className="error">{countryError}</span>
            </div>
            <div className="col">
              <TextInput
                label="State"
                id="state"
                placeholder="State"
                value={state}
                onChange={onStateChange}
              />
              <span className="error">{stateError}</span>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <input type="submit" className="btn btn-success" />
            </div>
            <div className="col">
              <ResetForm
                setProductCategory={setProductCategory}
                setSubCategory={setSubCategory}
                setUnitPrice={setUnitPrice}
                setUnitCost={setUnitCost}
                setDate={setDate}
                setQuantity={setQuantity}
                setAge={setAge}
                setGender={setGender}
                setCountry={setCountry}
                setState={setState}
                setShowSuccess={setShowSuccess}
              />
            </div>
          </div>
        </form>
      </div>
      {showSuccess && (
        <SuccessMessage
          formData={submittedData}
          onClosePopup={handleSuccessMessageClose}
        />
      )}
    </div>
  );
}