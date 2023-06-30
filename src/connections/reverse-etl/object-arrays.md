---
title: Supported Object and Arrays 
---

When you set up destination actions in Reverse ETL, depending on the destination, some mapping fields may require data to be in the form of an object or array. 

## Object mapping
To send data to a mapping field that requires object data, you can choose between these two options: 

Option | Details
------ | --------
Customize Object | This enables you to manually set up the mapping fields with any data from the model. If the model contains some object data, you can select properties within the object to set up the mappings as well.
Select Object | This enables you to send all nested properties within an object. The model needs to provide data in the format of the object. An example is an `Order completed` model with a `Products` column that’s in object format.

> success ""
> Certain object mapping fields have a fixed list of properties they can accept. If the names of the nested properties in your object don't match with the destination properties, the data won't send. Segment recommends you to use the **Customize Object** to ensure your mapping is successful.

Example: 
    ```
    {
        "product1": {
            "productColor": "pink",
            "productName": "tshirt"
        },
        "product2": {
            "productColor": "white",
            "productName": "skirt"
        }
    }
    ```

## Array mapping
To send data to a mapping field that requires array data, the model must to provide data in the format of an array of objects. An example is an `Order completed` model with a `Product purchased` column that’s in an array format.

Example: 

    ```
    [
    {
        "currency": "USD",
        "price": 40,
        "productName": "jacket",
        "purchaseTime": "2021-12-17 23:43:47.102",
        "quantity": 1
    },
    {
        "currency": "USD",
        "price": 5,
        "productName": "socks",
        "quantity": 2
    }
    ]
    ```

To send data to a mapping field that requires array data, you can choose between these two options: 

Option | Details
------ | --------
Select array | This enables you to send all nested properties within the array.
Customize array | This enables you to select the specific nested properties to send to the destination. 

Certain array mapping fields have a fixed list of properties they can accept. If the names of the nested properties in your array don't match the destination properties, the data won't send. Segmentrecommends you to use the **Customize array** option to ensure successful mapping.

ℹ️ Objects in an array don't need to have same properties. Any missing properties in the input object will be missed from the output object should the user selects that property for a mapping field.

