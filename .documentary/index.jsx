/**
 * The footer for documentation.
 */
export const footer = () => {
  const alt = 'art-deco'
  const src = 'https://avatars2.githubusercontent.com/u/57873407?v=4&s=100'
  const href = 'https://artd.eco'
  const org = 'Art Deco'
  const year = new Date().getFullYear()
  return [
    (<table>
      <tr>
        <td>
          <img src={src} alt={alt} />
        </td>
        <td>
          © <a href={href}>{org}</a> {year}
        </td>
      </tr>
    </table>),
  ]
}