# CSV Splitter

I ran into the problem of CSV files being too big for integrating with Airtable, for instance. So I created this small code to split them with pure typescript.
It takes a CSV file from the input folder, splits it into smaller CSV files based on the maximum file size specified by the user (in megabytes), and outputs the split files into the output folder.

## How to Use

1. **Install dependencies (ts node/types only):**
   ```bash
   npm install

2. **Run the application:**
   ```bash
   npm run app

Don't forget to specify the maximum file size (in megabytes).
The application will split the CSV file from the input folder into smaller CSV files and save them in the output folder.
