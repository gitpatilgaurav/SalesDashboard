import React, { useState } from "react";
import TextInput from "./FormComponents/TextInput";
import NumberInput from "./FormComponents/NumberInput";
import DateInput from "./FormComponents/DateInput";
import SelectInput from "./FormComponents/SelectInput";
import SuccessMessage from "./FormComponents/SuccessMessage";
import ResetForm from "./FormComponents/ResetForm";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { v4 as uuidv4 } from 'uuid';

export default function Form(props) {
  const apiData = useSelector((state) => state.ApiReducer);
  // console.log(apiData);

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

  const validateStringInput = (inputValue) => {
    if (/^[A-Za-z][A-Za-z\s]*$/.test(inputValue)) {
      return { value: inputValue, error: null };
    }
    return {
      error: "Only alphabets and spaces are allowed",
    };
  };

  const validateNumericInput = (inputValue) => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue) && numericValue >= 0) {
      return { value: numericValue, error: null };
    }
    return {
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
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = monthNames[selectedDate.getMonth()];

      setDate(event.target.value);
      setDateError("");
      setYear(year);
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

    setGender(value);
    setGenderError("");
  }
  // console.log(gender)

  function onCountryChange(event) {
    const { value } = event.target;
    setCountry(value);
    setCountryError("");
  }
  // console.log(country)

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

    const trimmedProductCategory = product_category.trim();
    const trimmedSubCategory = sub_category.trim();
    const trimmedCountry = country.trim();
    const trimmedState = state.trim();

   console.log(trimmedProductCategory)

    let isValid = true;

    if (!trimmedProductCategory) {
      setProductCategoryError("Product category is required.");
      isValid = false;
    } else {
      setProductCategoryError("");
    }

    if (!trimmedSubCategory) {
      setSubCategoryError("Sub category is required.");
      isValid = false;
    } else {
      setSubCategoryError("");
    }

    if (!trimmedCountry) {
      setCountryError("Country is required.");
      isValid = false;
    } else {
      setCountryError("");
    }

    if (!trimmedState) {
      setStateError("State is required.");
      isValid = false;
    } else {
      setStateError("");
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

    if (isValid) {
      let index = parseInt(apiData.length);
      const formData = {
        index: index + 1,
        date,
        year,
        month,
        customer_age,
        customer_gender,
        country: trimmedCountry,
        state: trimmedState,
        product_category: trimmedProductCategory,
        sub_category: trimmedSubCategory,
        quantity,
        unit_cost,
        unit_price,
        cost: unit_price * quantity,
        revenue: unit_cost * quantity,
        id: uuidv4(),
      };
      console.log(formData);
      try {
        const response = await fetch("http://localhost:8000/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          props.getdata();
          console.log("Data submitted successfully.");
          setProductCategory("");
          setSubCategory("");
          setUnitPrice("");
          setUnitCost("");
          setDate("");
          setQuantity("");
          setAge("");
          setGender("");
          setCountry("");
          setState("");
          setShowSuccess(true);
          setSubmittedData(formData);
        } else {
          console.error("Failed");
        }
      } catch (error) {
        console.error("Error in submitting", error);
      }
    }
  }

  return (
    <div className="form-container">
      <h5>Fill New Entries</h5>
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
                placeholder="Select Gender"
                onChange={onGenderChange}
              />
              <span className="error">{genderError}</span>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <SelectInput
                label="Country"
                id="country"
                options={[
                  "United States",
                  "France",
                  "Germany",
                  "India",
                  "Russia",
                  "Japan",
                  "Argentina",
                ]}
                value={country}
                placeholder="Select Country"
                onChange={onCountryChange}
              />
              {/* <TextInput
                label="Country"
                id="country"
                placeholder="Country"
                value={country}
                onChange={onCountryChange}
              /> */}
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
