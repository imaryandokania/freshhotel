import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ResorterReducer from '../../redux/ResorterReducer'

function Payment() {
    const dispatch = useDispatch(ResorterReducer)
    var cartstate = useSelector(state => state.cart)
    var cartstate = cartstate.sort((a, b) => Number(a.sys.id) - Number(b.sys.id))
    function totalpay() {
        var total = 0;
        cartstate.map(
            x => total += ((x.fields.price) * x.total)
        )
        return total
    }

    function setQuantity(event, id) {
        event.preventDefault()
        dispatch(
            {
                type: "change_quantity",
                payload: {
                    id: id,
                    quantity: event.target.value
                }
            }
        )
        console.log("In Cart", event.target.value, id)
    }

    function removeCart(event, id) {
        event.preventDefault()
        dispatch(
            {
                type: "remove_cart",
                payload: {
                    id: id
                }
            }
        )
    }

    function OnPayButton(event) {
        event.preventDefault()
        alert("Null")
    }
    return (
        <section className="text-gray-500 bg-gray-900 body-font h-full">
            <div class="container mx-auto px-6">
                <h3 class="text-gray-700 text-2xl font-medium mb-5">Payment</h3>
                <div class="flex items-center">
                    <Link to="/cart"><button class="flex text-sm text-blue-500 focus:outline-none"><span class="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">1</span> Cart</button></Link>
                    <Link to="/checkout"><button class="flex text-sm text-blue-500 ml-8 focus:outline-none"><span class="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">2</span> Shipping</button></Link>
                    <Link to="/payment"><button class="flex text-sm text-blue-500 ml-8 focus:outline-none"><span class="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">3</span> Payments</button></Link>
                </div>
                <div class="flex flex-col lg:flex-row mt-8">
                    <div class="w-full mb-8 flex-shrink-0 order-1 mt-8 lg:w-1/2 lg:mb-0 lg:order-2">
                        <div class="flex justify-center lg:justify-end">
                            <div class="border rounded-md max-w-md w-full px-4 py-3">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-gray-700 font-medium">Order total ({cartstate.length})</h3>
                                    <Link to="/cart"><span class="text-gray-600 text-sm">Edit</span></Link>
                                </div>
                                {cartstate.map(
                                    item => (
                                        <div class="flex justify-between mt-6">
                                            <div class="flex">
                                                <img class="h-20 w-20 object-cover rounded" src={item.fields.images[0].fields.file.url} alt="" />
                                                <div class="mx-3">
                                                    <Link to={{ pathname: `/view/room/Rs.{item.sys.id}/Rs.{item.fields.slug}` }}>
                                                        <h3 class="text-sm text-gray-600">{item.fields.name}</h3>
                                                    </Link>
                                                    <div class="flex items-center mt-2">
                                                        <input name="quantity" type="number" min={1} className="text-white bg-gray-900 h-10 whitespace-no-wrap text-xl" defaultValue={item.total} onChange={(event) => setQuantity(event, item.sys.id)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="text-gray-600">Rs.{(item.fields.price) * (item.total)}</span>
                                        </div>
                                    )
                                )}

                                <div class="flex items-center justify-between mt-6">
                                    <h3 class="text-gray-700 font-medium">Total Pay Rs.{totalpay()}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="leading-loose">
                        <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
                            <p className="text-gray-800 font-medium">Customer information</p>
                            <div className="">
                                <label className="block text-sm text-gray-00" for="cus_name">Name</label>
                                <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Your Name" aria-label="Name" />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600" for="cus_email">Email</label>
                                <input className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Your Email" aria-label="Email" />
                            </div>
                            <div className="mt-2">
                                <label className=" block text-sm text-gray-600" for="cus_email">Address</label>
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Street" aria-label="Email" />
                            </div>
                            <div className="mt-2">
                                <label className=" text-sm block text-gray-600" for="cus_email">City</label>
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="City" aria-label="Email" />
                            </div>
                            <div className="inline-block mt-2 w-1/2 pr-1">
                                <label className=" block text-sm text-gray-600" for="cus_email">Country</label>
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Country" aria-label="Email" />
                            </div>
                            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                                <label className=" block text-sm text-gray-600" for="cus_email">Zip</label>
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Zip" aria-label="Email" />
                            </div>
                            <p className="mt-4 text-gray-800 font-medium">Payment information</p>
                            <div className="">
                                <label className="block text-sm text-gray-600" for="cus_name">Card</label>
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Card Number MM/YY CVC" aria-label="Name" />
                            </div>
                            <div className="mt-4">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" onClick={OnPayButton}>Pay Rs.{totalpay()}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div></section>
    )
}

export default Payment
