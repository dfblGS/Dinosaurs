# Dinosaur Ecommerce Site

## DB Design

- Users
  * Have profile info including:
    * name
      * STRING
      * not empty or null
    * email
      * STRING
      * not empty or null; valid/unique email
    * password
      * STRING
      * not empty or null;
    * POTENTIAL
      * address
      * zip
      * CCard?

- Dinosaurs
  * Have info including:
    * name
      * STRING
      * not empty or null
    * price
      * INTEGER (Sell whole numbered dinos)
      * Not null
      * validate >= 0
    * quantity
      * INTEGER
      * Not null
      * validate >= 0
    * description
      * TEXT
    * imageUrl
      * STRING
      * not empty or null
      * Default dino image
      * validate: isUrl
