import React, { useState } from "react";
import TextInput from "./FormComponents/TextInput";
import NumberInput from "./FormComponents/NumberInput";
import DateInput from "./FormComponents/DateInput";
import SelectInput from "./FormComponents/SelectInput";
import SuccessMessage from "./FormComponents/SuccessMessage";
import ResetForm from "./FormComponents/ResetForm";

export default function Form() {
  const [productCategory, setProductCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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
    const trimmedValue = inputValue.trim();
    if (/^[A-Za-z\s]+$/.test(trimmedValue)) {
      return { value: trimmedValue, error: null };
    }
    return {
      value: inputValue,
      error: "Only alphabets and spaces are allowed.",
    };
  };

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
    const { value } = event.target;
    if (value) {
      setDate(value);
      setDateError("");
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
      console.log("error");
      return;
    }

    let isValid = true;

    if (!productCategory) {
      setProductCategoryError("Product category is required.");
      isValid = false;
    } else {
      setProductCategoryError("");
    }

    if (!subCategory) {
      setSubCategoryError("Sub category is required.");
      isValid = false;
    } else {
      setSubCategoryError("");
    }

    if (!unitPrice) {
      setUnitPriceError("Unit price is required.");
      isValid = false;
    } else {
      setUnitPriceError("");
    }

    if (!unitCost) {
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

    if (!age) {
      setAgeError("Age is required.");
      isValid = false;
    } else {
      setAgeError("");
    }

    if (!gender) {
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
      const formData = {
        productCategory,
        subCategory,
        unitPrice: parseFloat(unitPrice),
        unitCost: parseFloat(unitCost),
        date,
        quantity: parseInt(quantity),
        age: parseInt(age),
        gender,
        country,
        state,
        cost: unitPrice * quantity,
        revenue: unitCost * quantity,
      };

      try {
        const response = await fetch("http://localhost:8000/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
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
        console.error("Error in submiting", error);
      }
    }
  }

  return (
    <div className="form-container">
      <h5>Fill New Entries</h5>
      <br />
      <div className="form">
        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col">
              <TextInput
                label="Product Category"
                id="product_category"
                placeholder="Product Category"
                value={productCategory}
                onChange={onProductCategoryChange}
              />
              <span className="error">{productCategoryError}</span>
            </div>
            <div className="col">
              <TextInput
                label="Sub Category"
                id="sub_category"
                placeholder="Sub Category"
                value={subCategory}
                onChange={onSubCategoryChange}
              />
              <span className="error">{subCategoryError}</span>
            </div>
            <div className="col">
              <NumberInput
                label="Unit Price"
                id="unit_price"
                placeholder="Unit Price"
                value={unitPrice}
                onChange={onUnitPriceChange}
              />
              <span className="error">{unitPriceError}</span>
            </div>
            <div className="col">
              <NumberInput
                label="Unit Cost"
                id="unit_cost"
                placeholder="Unit Cost"
                value={unitCost}
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
              <TextInput
                label="Age"
                id="age"
                placeholder="Age"
                value={age}
                onChange={onAgeChange}
              />
              <span className="error">{ageError}</span>
            </div>
            <div className="col">
              <SelectInput
                label="Gender"
                id="gender"
                options={["F", "M"]}
                value={gender}
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
