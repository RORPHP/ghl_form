"use client"
import * as React from "react";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'
import './style.css'

export default function Page() {
  const [formData,setFormData] = React.useState({})
  const [docSigRef,setDocSigRef] = React.useState(null)
  const [patientSigRef,setPatientSigRef] = React.useState(null)

  const makeKey = (key) => {
    return key.replaceAll(' ','_').toLowerCase()
  }
  const onCheckboxChange = (e,key=false,is_array=false,child_text=false,parent_key=false,parent_value=false,child_key=false) => {
    var data = formData;

  //  console.log(key,is_array,child_text,parent_key,child_key)

    if(parent_key){
      parent = makeKey(parent_key)
      if(!data.hasOwnProperty(parent) || data[parent].indexOf(parent_value) == -1){
          alert(`${parent_value} is required`)
          e.preventDefault();
          e.stopPropagation();
          return false
      }
    }

    if(is_array){

      if(key){
        key = makeKey(key)
        var arr = data.hasOwnProperty(key) == false ? [] :  (Array.isArray(data[key]) ? data[key] : [])
        if(e.target.checked){
          arr.push(e.target.value)

        }else{
          arr.splice(arr.indexOf(e.target.value), 1)

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }

        }

        data[key] = arr

      }else{
        key = makeKey(e.target.value)
        var arr = data.hasOwnProperty(key) == false || data.key.length == 0 ? [] :  data[key]
        if(e.target.checked){
          arr.push(e.target.value)
        }else{

          arr.splice(arr.indexOf(e.target.value), 1)

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }

        }
        data[key] = arr
      }

    }else{

      if(key){
        key = makeKey(key)
        var arr = data.hasOwnProperty(key) == false ? [] :  data[key]
        if(e.target.checked){
          data[key] = e.target.value

        }else{

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }

          delete data[key]
        }
      }else{
        key = makeKey(e.target.value)
        var arr = data.hasOwnProperty(key) == false ? [] :  data[key]
        if(e.target.checked){
          data[key] = e.target.value
        }else{

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }
          delete data[key]
        }
      }
    }

    setFormData(data)
    console.log(data)
  }
  const onTextChange = (e,key,parent_key=false,in_array=false) => {
    key = makeKey(key)
    var data = formData;

    if(parent_key){
      parent = makeKey(parent_key)
      // console.log(parent)
      if(!data.hasOwnProperty(parent)){

        if(in_array){
          alert(`${in_array} is required`)
          if(document.getElementById(key) != null){
            document.getElementById(key).value = ''
          }
          return false;
        }else{
          alert(`${parent_key} is required`)
          if(document.getElementById(key) != null){
            document.getElementById(key).value = ''
          }
          return false;
        }

      }else{
        if(in_array && data[parent].indexOf(in_array) == -1){
          alert(`${in_array} is required`)
          if(document.getElementById(key) != null){
            document.getElementById(key).value = ''
          }
          return false;
        }
      }
    }

    data[key] = e.target.value
    setFormData(data)
    console.log(data)
  }

  const onRadioChange = (e,key,in_array=false,parent_key=false,parent_value=false) => {
    var data = formData;

    if(parent_key){

      var parent = makeKey(parent_key)

      if(in_array){
        if(data.hasOwnProperty(parent)){
          if(data[parent].indexOf(parent_value) == -1){
            alert(`${parent_value} is required.`)
            e.preventDefault();
            e.stopPropagation();
            return false
          }
        }else{
            alert(`${parent_value} is required.`)
            e.preventDefault();
            e.stopPropagation();
            return false
        }
      }
    }

    if(key){
      if(e.target.checked){
        key = makeKey(key)

        if(!data.hasOwnProperty(key)){
          data[key] = e.target.value
        }else{
          if(e.target.value == data[key]){
            e.target.checked = false
            delete data[key]
          }else{
            data[key] = e.target.value
          }
        }

      }else{

        key = makeKey(key)
        delete data[key]
      }
    }else{
      if(e.target.checked){
        key = makeKey(e.target.value)
        if(!data.hasOwnProperty(key)){
          data[key] = e.target.value
        }else{
          if(e.target.value == data[key]){
            e.target.checked = false
            delete data[key]
          }else{
            data[key] = e.target.value
          }
        }
      }else{
        key = makeKey(e.target.value)
        delete data[key]
      }
    }

    setFormData(data)
    console.log(data)
  }

  const HeaderElements = () => {
    return (
    <>
    <h1 className="form-heading">Rezept Vorlage</h1>
    <p>Ibuprofen 600mg 1-1-1 N1</p>
    <p>Novalgin 30 Tropfen bei Bedarf bis zu 4x tgl. N1</p>
    <p>Pantozol 20mg 1-0-0 N1</p>
    <p>Clexane Fertigspritze 20mg 10 Stück</p>
    <p>Bromelain POS 1-1-1 N1</p>
    <p>Arnica Globuli D12 10g 3 Kügelchen pro Tag</p>
    <p>Bepanthen Creme 100g dünn auf die Binde auftragen 2x tgl. für 2 Wochen</p>
    <p>Emla Salbe 30g 2x tgl. für 5 Tage nach OP dünn auf Binde auftragen</p>
    <p>Octenisept-Spray 250ml 1x tgl. morgens nach dem vorsichtigen Duschen</p>
    <p>Rivanol Lösung 1 Liter 4-6 x tgl. für 20 Minuten als Umschlag, im Kühlschrank lagern</p>
    <p>Mullkompressen 10x10cm unsteril 50 Stück</p>
    <br />
    <p>Ibuprofen 600mg 1-1-1 N1</p>
    <p>Novalgin 30 Tropfen bei Bedarf bis zu 4x tgl. N1</p>
    <p>Pantozol 20mg 1-0-0 N1</p>
    <br />
    <p>Clexane Fertigspritze 20mg 10 Stück</p>
    <p>Bromelain POS 1-1-1 N1</p>
    <p>Arnica Globuli D12 10g 3 Kügelchen pro Tag</p>
    <br />
    <p>Bepanthen Creme 100g dünn auf die Binde auftragen 2x tgl. für 2 Wochen</p>
    <p>Emla Salbe 30g 2x tgl. für 5 Tage nach OP dünn auf Binde auftragen</p>
    <p>Octenisept-Spray 250ml 1x tgl. morgens nach dem vorsichtigen Duschen</p>
    <br />
    <p>Rivanol Lösung 1 Liter 4-6 x tgl. für 20 Minuten als Umschlag, im Kühlschrank lager</p>
    <p>Mullkompressen 10x10cm unsteril 50 Stück</p>
    </>
    )
  }

  return (
    <>
      <div className="form-section">
          <form action="">
              <div className="header-logo">
                  <img src="header-logo.png" alt="Image" />
              </div>
              <HeaderElements />
              <div className="footer-logo">
                  <img src="footer-logo.png" alt="Image" />
              </div>
         </form>
      </div>
    </>
  )

}
