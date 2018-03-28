# my-printer

React my-printer component for external web apps

## Usage

### Install
```
npm i @react-ag-components/my-printer --save
```
### Use in your project
```
import ContactPerson from '@react-ag-components/my-printer'
```

```
let commodities = [
  {value: "D",label: "Dairy (Just For Testing)"},
  {value: "F",label: "Fish (Just For Testing)"},
  {value: "H",label: "Hort (For Testing Only)"},
  {value: "X",label: "All Other Goods"}
]

let activeCommodities = ["X"]
```

```
<Commodities
  ref="commodities"
  commodities={this.state.commodities}
  activeCommodities={this.state.activeCommodities}
/>

```

### Properties

| prop        | Type           | Note  |
| ------------- |:-------------:| -----:|
| commodities      | object | data.commodities |
| activeCommodities      | object | data.activeCommodities |



## Contributing

Get the repository
```
git clone https://github.com/alphillips/my-printer-component.git
```

Update dependencies
```
npm install
```

Run the project
```
npm start
```

### Deploy to npm
#### Build
`npm run build -- --copy-files`

#### Publish
`npm publish --access public`
