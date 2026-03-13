import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String name = request.getParameter("name");
        String ageStr = request.getParameter("age");
        out.println("<html><body>");
        try {
            int age = Integer.parseInt(ageStr);
            out.println("<h2>Hello, " + name + "! You are " + age + " years old.</h2>");
        } catch (NumberFormatException e) {
            out.println("<h2>Invalid age entered. Please enter a valid number.</h2>");
        }
        out.println("</body></html>");
    }
}