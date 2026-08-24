// AarogyaAI — Auth Pages JS

document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Password toggle
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-wrap').querySelector('input');
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Basic form validation
  document.querySelectorAll('.auth-form form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

      // Check required fields
      form.querySelectorAll('[required]').forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          group?.classList.add('has-error');
          valid = false;
        }
      });

      // Password match on signup
      const pw = form.querySelector('[name="password"]');
      const cpw = form.querySelector('[name="confirm_password"]');
      if (pw && cpw && pw.value !== cpw.value) {
        cpw.closest('.form-group')?.classList.add('has-error');
        const err = cpw.closest('.form-group')?.querySelector('.field-error');
        if (err) err.textContent = 'Passwords do not match';
        valid = false;
      }

      if (valid) {
        const btn = form.querySelector('.btn-auth');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Success!';
          btn.style.background = '#10B981';
          setTimeout(() => {
            // Reset after demo
            btn.disabled = false;
            btn.style.background = '';
            btn.innerHTML = btn.dataset.originalText || 'Submit';
          }, 2000);
        }, 1500);
      }
    });

    // Store original button text
    const btn = form.querySelector('.btn-auth');
    if (btn) btn.dataset.originalText = btn.innerHTML;
  });

  // Phone number formatting (India)
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9+\s-]/g, '').slice(0, 15);
    });
  });
});
