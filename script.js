  let bookings = [];
        let movie = document.getElementById("movie");
        let quantity = document.getElementById("quantity");
        let total = document.getElementById("total");
        let form = document.getElementById("bookingForm");
        function calculatePrice() {
            let price = Number(movie.value);
            let tickets = Number(quantity.value);
            if (tickets > 0) {
                total.innerText = price * tickets;
            } else {
                total.innerText = price;
            }
        }
        movie.addEventListener("change", calculatePrice);
        quantity.addEventListener("input", calculatePrice);
        function selectMovie(price, name) {
            movie.value = price;
            calculatePrice();
            document.getElementById("message").innerText =
                name + " selected!";
            document.getElementById("bookingFormSection")
                .scrollIntoView({ behavior: "smooth" });
        }
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let tickets = Number(quantity.value);
            let email = document.getElementById("email").value;
            if (tickets < 1 || !Number.isInteger(tickets)) {
                document.getElementById("message").innerText =
                    "Please enter a valid ticket quantity!";
                return;
            }
            let booking = {
                movie: movie.options[movie.selectedIndex].text,
                time: document.getElementById("time").value,
                quantity: tickets,
                email: email,
                total: Number(movie.value) * tickets
            };
            bookings.push(booking);
            document.getElementById("message").innerText =
                "Booking successful!";
            showBookings();
            form.reset();
            calculatePrice();
        });
        function showBookings() {
            let output = "";
            let search = document.getElementById("search")
                .value.toLowerCase();
            for (let i = 0; i < bookings.length; i++) {
                if (bookings[i].movie.toLowerCase().includes(search)) {
                    output += `
                        <div class="booking">
                            <p><b>Movie:</b> ${bookings[i].movie}</p>
                            <p><b>Showtime:</b> ${bookings[i].time}</p>
                            <p><b>Tickets:</b> ${bookings[i].quantity}</p>
                            <p><b>Email:</b> ${bookings[i].email}</p>
                            <p><b>Total:</b> ₹${bookings[i].total}</p>

                            <button onclick="cancelBooking(${i})">
                                Cancel Booking
                            </button>
                        </div>
                    `;
                }
            }
            document.getElementById("bookings").innerHTML = output;
            document.getElementById("count").innerText = bookings.length;
        }
        function cancelBooking(index) {
            bookings.splice(index, 1);
            document.getElementById("message").innerText =
                "Booking cancelled!";
            showBookings();
        }
        document.getElementById("search")
            .addEventListener("input", showBookings);
        form.addEventListener("reset", function() {
            document.getElementById("message").innerText = "";
            setTimeout(calculatePrice, 0);
        });
        