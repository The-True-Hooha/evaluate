import org.junit.Test;
import static org.junit.Assert.*;

public class SolutionTest {

    @Test
    public void testAdd1() {
        Solution solution = new Solution();
        int result = solution.add(2, 3);
        assertEquals(5, result);
    }
    @Test
    public void testAdd2() {
        Solution solution = new Solution();
        int result = solution.add(90, 90);
        assertEquals(180, result);
    }
    @Test
    public void testAdd3() {
        Solution solution = new Solution();
        int result = solution.add(10, 19);
        assertEquals(29, result);
    }
    @Test
    public void testAdd4() {
        Solution solution = new Solution();
        int result = solution.add(45, 3);
        assertEquals(48, result);
    }
    @Test
    public void testAdd5() {
        Solution solution = new Solution();
        int result = solution.add(100, 100);
        assertEquals(200, result);
    }
}