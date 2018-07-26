import enzyme, { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import { HomePage } from './HomePage'
import Adapter from 'enzyme-adapter-react-16'
import store from '../store'
const adapter = new Adapter()
enzyme.configure({adapter})

const dinosaurs = [{id: 1, name:'t-rex', price: 5, description: 'this is a description', image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'}, {id: 2, name:'raptor', price: 5, description: 'this is a description', image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'}]


describe('HomePage Component', () => {

  let wrapper

  before('set up wrapper', () => {
    wrapper = shallow(<HomePage  />)

  })

  // it('receives dinosaurs as props', () => {
  //   expect(wrapper.instance().props.dinosaurs).to.exist
  //   expect(wrapper.instance().props.dinosaurs).to.be.an('array')
  // })

  it('displays a list with all dinos, with name, price and image', () => {
    dinosaurs.forEach(dino => {
      expect(wrapper.text()).to.contain(dino.name)
      expect(wrapper.text()).to.contain(dino.price)
      expect(wrapper.text()).to.contain(dino.image)
    })
  })
  it('renders a button on each Dino to add it to cart', () => {
      expect(wrapper.find('button')).to.have.length(dinosaurs.length)
  })
})

