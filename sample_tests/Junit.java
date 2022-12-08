import org.junit.Test;
import static org.junit.Assert.*;

public class SolutionTest {

    @Test
    public void testAdd1() {
        Solution solution = new Solution();
        int result = solution.cube(2);
        assertEquals(8, result);
    }
    @Test
    public void testAdd2() {
        Solution solution = new Solution();
        int result = solution.cube(7);
        assertEquals(343, result);
    }
    @Test
    public void testAdd3() {
        Solution solution = new Solution();
        int result = solution.cube(10);
        assertEquals(1000, result);
    }
}