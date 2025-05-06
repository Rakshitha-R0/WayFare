import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is a required field"],
      minLength: [4, "username must be above 4 characters"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is a required field"]
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      minLength: [6, "Min character length is 6"],
      required: [true, "password is a required field"],
    },
    confirmPassword: {
      type: String,
      select:false,
      minLength: [6, "Min character length is 6"],
      required: [true, "Confirm password is a required field"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and Confirm Password do not match",
      },
    },
    image:{
      type: String,
      default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAADiCAMAAAD5w+JtAAAAflBMVEVYWVvv7ez////u7Ovz8vH7+vr39vX29PRWV1lTVFZPUFJMTU/5+fj9/PxHSEpKS01CREZmZmdcXV51dXbk4+KBgYGvr696enva2dk7PT9hYmO7u7ttbW6bmpqTk5OMjIzNzMylpaXR0dHGxcW3t7esq6uHh4c4OTyfn57f3+DQrfStAAARmklEQVR4nO1dabuqKhtORGRQpNKyZbOtdv3/P/hq5VAOQaBrrfc695dzttuN3PHAMwITUABad9hu+cguHvnFE7d4BMuXrOIlr3jiFS9ZzcZR8cQvGy9famm82QPUbLzZA6d8afIfvzf87Ebr/1/8mq3/x+8v8ftPPv82vz8zfvYDNX4Fal14ADZfcqrWH6h1oXhU46fUeI1fd+M1fgUmsIDnOzf4qHz0eOL45RNUvOQ0X3JfX3Kqlxylxj2JxmsvOY2X3LIHk3Jwy5+/EK+nX0hCvGDxUp+Ao+YYNcXLk2m8R8Brjffwa5PwXn7Fk2d+z+LlIzeHBfumT98EluFnjcjv8QffCe043u/3aZwhRCXhmnD8PX6OHR+Tw3m65mKVQ4iV+Jf/R4jpdPud7OPsXQfBfDK8kc9fxO/WugPtUzSfUSY4JQRP8OSB/H8wnhDCGed0Ot8dYttzffhHxs+2sndgeomCFWclqU4QwgLOltvTFVT4peOXr4oOgMftXHBG3lJ7ZsmnUWp39+Bjfk317H2onqHl++EpWnNG349bC0cazHbJXbZbGm9YH3IGwgSZQvbD7M/ZZPuEW4FsskZJ1l+lD7t9fylnn/k9v9D9jwgdNzNKNbjdgQnHy9Tr7oGqfVYTr1cJl/UfMrIwXQq1KdcDGswXXlcPxvcfXBAf/gn9oasBZ3Ia/hJ+frijgc6ka2dIyeZa6/qP8Qu3PDBN7s4wWJ3jolc/xe96ZsOwu4Hy5d69eQ4/ww8dZEwULYZ0GwJD/GTct7qH5S9mYlByOTAXB8uxm/xsSX5+gZqHXMB6PLGc4knpfiMQL40phH6GdJL4sNkDWHYTNnpeBQ4+tc/c7T+jGqEXQQRLTa8YHfrQvk4YH41dBkZP7n1qjOI/WLtxRLMC5pGNxuIXYjYuuxyUJvkSPzw/73tgndABHEQ2HJ5fODdvjEmCz6+OagBcjZ8F9pMfkM0CbLVwym6a55d5eUkwnlZoZbhTHT8F/YfAdvWj7PJJuCwJyum/8v/e22dwMqrSawebxTcTTdY+q/hZb/iF85+VzQcI2YOO1U+LX/z1K+jlMnoC5vnFwcgmSzcIOfmm+SVjW2R9wCIFJucfBMnqp5R6O8QC9CUQ1fjZTvIzJlk3CEt8U/yy0fs9c6+ESFT5dXmQTip+2ejlwKwkKFlfUKTkqwjA7Y8g/Pp9ozfJ4xZ7/7m+wKnqCxz5+gI4+5X0cjVxvFsypbx9Ul8Ap8boEUIovSVzzYBOrjkjPf9hayYGSIRYTdfL7Xa3nq1WQiuLVjW6vKXudfhdTNAjYhIlR/Sw/B3XPm2nRhwtEbl6/FID0XdCZ6ntIvdRCpO1DrMlbD/nBhjyi6/DzzYw9/jXHiKrAQjSuQGj6F/sf8zPdfVdBsIOCDbZ3TqB9lPtYAfFV9jLr8d/Bxdtf5bOYq+dXQ4UrrXln82tGr+m/15l6b0HHgl7FyT/dD8uzlYl7W1DCDbaI8g2AD33HLluwcXrsc+uM93pQXcu7KOXwbtoExRpIXFq9QWRruzQL6efXA7nrDsJyLRI8ir5DwtdzVd+tx9AO6zDI6DOL9Q2MXK5keAHY6z9pYchqsJvqTsvgh2QoZcpppOupOCZDRX5JbqzAk9sKfHM4GtLKNsCNX7ORNdyCQ6O1PBlQHvdlQyT/MdUqC/YaGv2IJRkl8HV9sHY2n9TX1COn4V8EGqrPrLssVteYPv6Wl4kTt7zor6gbLvVPgNzA1aFhO4rx++kLS54DWXrCxA66udReOrK80Ox/gfZSdp/QGt9t4jHsqvn7eP6H8RYlh9IDfjsXFo75HDX+p6gOMmO39qEY93i0vYg0h9AMkNIil9qIIuJAzV+SwOBgmwJleI3N/AtTEEHk1bAjYFvklm5pPXxu5rIsWOiNH5G+E14OYB98YnIROCOLuWMa6P8MPGtnvqC+5eORuK5ZO2Pz28i9oV9Vrb8Yn/aYGukfgezH5DPzCh8CGG3/wCxkS9hqrZ+7swkOYLrG34GLMEbFMcPmdAPGfihn5/tGTDNbh+aKPFzL/+MJFyyZbuXHzKiHDI52Sqpv8yFX5jZZsDTPn62821GPPlC3vu7IzaThqO7fn5zM7lHZX5wb2jeB7CTX6YWj4ZytWyn4N3e+GnHsx4Q6Z1fGb92H4DI8cDBUPEqOat4Rxkc/QjFHewMYM6lrC94ss+0o2YP0LOC927lZoV+GuKBmW11xicMrZ63aIgiP1Pjd/eSOvhppxwKqPMzVltKI9DFzzNkRWT8pirWdQZTdsUkjxzADvm0zRWwkqvi+JmrcBPXLn4GwoIFsEL0Ogcyt+uAL5wOfmZco/tHjpaChGYTxtxPS+Zuh/++NCefbFElNN4i641B0ZnMnurPCv3uOleDdXQ4iLY7SRcenpZbkyV8IvYzW6VRX4CORnfeUPHlSw7fOTBTjvZAkLTWF5hyUUr8CyV9wC+z5bNk2WpfAwMx5Cfwb6kMJzSRDqiDTNv5mS7TJXMZJ8kGO9P7RmaW38IPGd87JRIJKxuGxg8IYEfQws9M4LOOmyn4DmhhfNMWT9r4mfIwK2BqvTezTSQbX0AXbfwO5je/8dN7ATUUeKmDRG3ri6EQ69OHpm/5wbP5/a5kWi1spX0GDYWWnsDjdwTtAb5aREGf7GtoIEXcAF32q3gbbIfYVCisJj97NsCHJuTYP3zOINvuVnGDn3sdZI/RGxWBjEVEniCOTX6GAqwvwCLsUxG2YdPzAX5q8EMmqgraPrXpmYGm0gGNjy5e+dn+QPwyWekZv4G2bhVpsrp8mtip0gbWF2ka5pNFluXGr9zrMNS5Ej3rCxpoZyGp8SvKI3+Cn2uiUqoFNCrTj6V9NhC/3ki2sxvmozUDtOQ3iCGR/ZTzbgvN9gfjBxr8DAYHnz/1S/gZjxLcwXr0n208pPUAbeE30PxbpX0WtoG63Ta0jd8g/LCY9bDLRnAuhtAQI/EjfPbdH0KDzn5q9mTUG2hUfrbkZyr1XoDQ4GthvfffYbImpp0kEpV7NIv8g1n7mnBBt3soVSSC3OthutI7d/kFmX1W5h8ePJEh+xNTxoNZdDg6ktmHG0UULnZTETBqZiBZzT4rPqEfJceEcvI136ax7SKkkv+77xi/Jof1hAYB0SYZNP0HXX6Mrybn7zSEDlArDakPow+s8Ph9/uKa0tr0/yyok/0jYhYlIcyP87DUxu0Ztp2fqOrAcLGZ6pwV3uK/W+HHv1gglifbVS2o6wPykHWMxMcrekv85eP4GeXbECCtYWsHsC/4wzVv1VJf8Fn8E/NlCBVrzSRhQxSe+SezBvMmP9v5JL1J6clTK7RWAgQJ+2Aakimo+JWnEW/UhYF+xYp1uqpA8AO/jaz9lvoC9TwcmYau8Wn3DBtC9co0fvBb6gv2qgoQc/tjVSdPEEHlIE2mHlryY5Zqfjo4Ke1R+ZhgrHpgU3t+GigeI0AVdhBrwVPNvJJrW32B6r44IVveog3FE8o66kM8NQ+QLIeffHeohqHIupWfogfILmMNn2ruJ/Me2vi5sdI6JXoDR2ZxVeIn4nZ+nko2AIthrLJWuEq1AcSu8/uw/lOqdscUlNK8eIk66ndV9sbxdMTxg1cFfnQDO+rnQwUNr1hArgcbKJwEJ45ux/jBqXQrqhscdPnJb3rGq7Crfh7IuxC0J20yANBFml+m3Tv3r8iXENKt9Ok8RvjJa0D+3c0PSLcieTaWMchHv3C+MHTxk06SZfzGpCfPj9423nedX7CXNfSE4v4UXUgvfcHWeT6/4OmWJEu2mbH5hbLRLx6C2/lL5f1OJVNoW7YnmYXHk1GXz8xCk1QQZH471rxzf7jkCoq/RuaHIrmZ84hcd55fAOUOBhubn+1IlvnSsJ8fkkvjkvl4ztGdn1yMInNt34yf3LGR5DyuepDlVyQeOvnZcmcd0s0YoTNlfngK3/DLLCEZflz+8EQz/Dyp6Cwr8mI99yNI7beghzHdByvfhCUxfligkl/j/ILilmOQSPxS9HtcfrYnk14ONgA9ccnvZ26cL+Xz9ytM8Bv54UlY3HTRe/6ZxFQem5/UJsHaoTO9/Oz34WI2Oj+JbUqBJXc+n8QAjr2+ZPL5tk/8AuT4+dZbG4asFc930eXnb9+FTjCPJc+PRP77cKM4jmyAvq1+yBZP2fMxofv2EDQyl9i6aA7viwMwCeXvf0DJWyMmWHdd62AeEO7ezj6Rlyy13Z/Tev8Ren96OftKkfQJDFrs0PH9NRuEZk577f4jvzyf6NU+u9+PcH0fMCY8ip3B3QjohBuJqkKWIFvpfoRvCT+Qitl37A/oCbromiyFhOV534Wgcv68LeXIE0rmiyuCrunyrLzQDoWnCHOZ4gLM4jwcq3R/QCqZbMGcrw+xDYxKKgRwf4oYlwxXioP6/QgKGyIyisH8sg+hq6/1Yba8hcfDnHD5E4vI18M5V+LnqNS2Eco4me++jza83UB/u8tJnlUecr5dUB+Gp81yJtQKlenx3nfF+w1lHMEnYMaFmJ4vyfEaIuD7kgoSegg4Vng8LZZfQiiM2wPi8Eglq97f+NHJEIRQzuhkOt8ukmNswzBXR5nbeW+7HNXM9cz+wrbs8JguLufpjLD8arkPPljtQVe9v9HVKGfHlAU8EHg9320vSZJer8iFNxMJQeTax2OSbLfb5XTGs0FnGhsgCIWo6Hmb/mv479X9VU6ofxU6xoRkUpthJfhsnWMmVqv8ASPMwFWALK0OK5C7H6F2v5rRTR84v+Awh8E2J3z7+f1qlol7SoYFXWeTWIMfkMxr/BDYVwj17m8MZ7/kVu024Ens6N6/qX/VzGDAIvW17xcFR6OHrxkEpoubPajJD5wGOtlAF+JxRU8/vx79V5wSI+tKjAqc3292R41fU/+V9QU15764JanYGvE+/DE+gp0PapURd/O86LlXPuq4n+uOh9nqosMgx9DoQOwqs6Vwrj++/91yDN1ibAx851fdLJeQD/llM9j/XSModi60DPLzs1VU+zJVY8iWFgfahvmBxNi935rAfHuLvBrmBxIjV2JrA6++74Fl0/xArH9dsz4IOz12nqvya/jvoNT9d37gqn9ftAF63rP1keuHHv8dKcAPte/81QSbhMB939G++oKmfVb9Qvl90T+5yohd1adqD2P5SDk+0SLhp3/DnHklAcIvmQ1W8Su1c8Xv8ehjflnr4fKHVD2dpKC2+g3FD3iXj3ZtawLzyEbWGPxyVT/6OspoAvPuj8IPuNtxh5CwZfhwZkfhl/m8sxGHkPIUQntIfvYrPwAvAxyc1M5udbZavNMefu31BYXzi8pHT3sHnj1kB4IwMnTcTi8wm8cOaO1BAafR8zIE4cvZZ7VfqKZBnf1EDK3tOf723MpCBKBMpkjaZxU/61UCXu3rFgn/ng250OAAX6ybrVzn1706aPoPLfyAtSAS9aKfseN4E/r3ifdj/DJ75sQGGUPBD7Vl5ef4WY63mOucltQGImYJbO3B6PyytQa56VLo50JLUD5L7Y4ejM/v/kK4mX5+IFQdjLPNtbsH48vn7Q0L+ugYzYRmMoayyTmpPmeUn7L+e3kpM4DsdEPEp+spZoIvkxChtsY/1n9K/rtd8y4b3LMfyPJ863iYcqY8jJSJ9S51X3rw1PjLrz+I/97nPedreda068JrGk2oCOQCpvmxhWy2PsRVp7yWxhuzZ1j/oY3fUxfi5PtWjsRI17lAGBPGxYqsL8kReb5biddf4Je/48T70zmafhEmWMAYzUEIZSwIOCHTabQ97EPHyzNzlm218LO6G/8F/LJHyHGyyXs9HtP0sNnuoug8n58vmzRN4yuEL43/PX433fjU0uNViF4UTDu/3y2f7errtjLXXdA/Pn6v/BpdGHb8jOq/FxWlqJ7LHjhqjdf4NfVfeZNxVV9QPKmy9E5tb8TLS1WYwGu8VP27snHU/HfajVexi2bPJeoL2uxPGzZfaohXbYzKxmXC622NNwTcbol+DWdft0+fluVBMX3wC/yH7vH7Dfz+B7isZixTnJKZAAAAAElFTkSuQmCC",
      required: [true, "image is a required field"],
    }
  },
  {
    timestamps: true, 
  }
);

//pre middleware
userSchema.pre("save", async function(next){
    this.password=await bcrypt.hash(this.password, 10)
    this.confirmPassword=undefined
    next()
})

userSchema.methods.comparePassword=async function(pwd,pwdDB){
      return await bcrypt.compare(pwd,pwdDB)
}

const User = model("User", userSchema);

export default User;