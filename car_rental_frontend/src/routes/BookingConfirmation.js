export default function BookingConfirmation() {
  return (
    <div>
      <div>Car details</div>
      <h4>Please Input your email and phone numbe to confirm booking!</h4>
      <form>
        <input placeholder="Your Email" />
        <input placeholder="Your Phone No." />
        <button>Confirm</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
